import * as cheerio from "cheerio";
import timezone from "timezone";
import timezoneAmerica from "timezone/America";

import type { MasjidRecord } from "./types";

const us = timezone(timezoneAmerica);

export const parsePositiveInt = (value: unknown, fallback: number): number => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

const DEFAULT_HTTP_TIMEOUT_MS = parsePositiveInt(
  process.env.HTTP_TIMEOUT_MS,
  20_000,
);
const DEFAULT_HTTP_RETRIES = parsePositiveInt(process.env.HTTP_RETRIES, 2);
const RETRYABLE_STATUS_CODES = new Set([408, 425, 429, 500, 502, 503, 504]);
const RETRYABLE_ERROR_CODES = new Set([
  "ECONNABORTED",
  "ETIMEDOUT",
  "ECONNRESET",
  "EAI_AGAIN",
]);

const sleep = async (ms: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

type HttpRequestOptions = {
  fetch?: BunFetchRequestInit;
  timeoutMs?: number;
};

type JsonParseResult = ReturnType<typeof JSON.parse>;

type HttpResponse<T = JsonParseResult> = {
  data: T;
  headers: Headers;
  status: number;
};

const createTimedSignal = (
  timeoutMs: number,
  externalSignal?: AbortSignal | null,
): { cleanup: () => void; signal: AbortSignal } => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  const onAbort = () => controller.abort();

  if (externalSignal) {
    if (externalSignal.aborted) {
      controller.abort();
    } else {
      externalSignal.addEventListener("abort", onAbort, { once: true });
    }
  }

  return {
    cleanup: () => {
      clearTimeout(timeoutId);
      externalSignal?.removeEventListener("abort", onAbort);
    },
    signal: controller.signal,
  };
};

const toFetchInit = (opts?: HttpRequestOptions): BunFetchRequestInit => {
  return { ...(opts?.fetch ?? {}) } as BunFetchRequestInit;
};

const isRetryableFetchError = (error: unknown): boolean => {
  if (error instanceof TypeError) {
    return true;
  }
  if (error instanceof DOMException && error.name === "AbortError") {
    return true;
  }

  const code =
    typeof error === "object" && error !== null && "code" in error
      ? (error as { code?: unknown }).code
      : undefined;

  return typeof code === "string" && RETRYABLE_ERROR_CODES.has(code);
};

const parseResponseData = async <T = JsonParseResult>(
  response: Response,
): Promise<T> => {
  const contentType = (
    response.headers.get("content-type") ?? ""
  ).toLowerCase();
  const text = await response.text();
  const trimmed = text.trim();
  const looksLikeJson =
    contentType.includes("json") ||
    (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
    (trimmed.startsWith("[") && trimmed.endsWith("]"));

  if (looksLikeJson) {
    try {
      return JSON.parse(text) as T;
    } catch {
      // Fall through for non-JSON bodies that happen to look JSON-ish.
    }
  }

  return text as T;
};

const getWithRetry = async (
  url: string,
  opts?: HttpRequestOptions,
): Promise<Response> => {
  const attempts = DEFAULT_HTTP_RETRIES + 1;
  const timeoutMs = parsePositiveInt(opts?.timeoutMs, DEFAULT_HTTP_TIMEOUT_MS);
  const fetchInit = toFetchInit(opts);

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const { cleanup, signal } = createTimedSignal(timeoutMs, fetchInit.signal);

    try {
      const response = await Bun.fetch(url, {
        ...fetchInit,
        method: fetchInit.method ?? "GET",
        signal,
      });

      if (response.ok) {
        return response;
      }

      const retryable = RETRYABLE_STATUS_CODES.has(response.status);
      if (!retryable || attempt === attempts - 1) {
        throw new Error(`request failed: ${response.status} ${url}`);
      }
    } catch (error: unknown) {
      const retryable = isRetryableFetchError(error);

      if (!retryable || attempt === attempts - 1) {
        throw error;
      }
    } finally {
      cleanup();
    }

    await sleep(Math.min(3_000, 500 * 2 ** attempt));
  }

  throw new Error(`request attempts exhausted for ${url}`);
};

export const get = async <T = JsonParseResult>(
  url: string,
  opts?: HttpRequestOptions,
): Promise<HttpResponse<T>> => {
  const response = await getWithRetry(url, opts);
  const data = await parseResponseData<T>(response);
  return {
    data,
    headers: response.headers,
    status: response.status,
  } as HttpResponse<T>;
};

export const loadJson = async <T = JsonParseResult>(
  url: string,
  opts?: HttpRequestOptions,
): Promise<T> => {
  const response = await getWithRetry(url, opts);
  return parseResponseData<T>(response);
};

export const load = async (
  url: string,
  opts?: HttpRequestOptions & { cheerio?: cheerio.CheerioOptions },
): Promise<cheerio.CheerioAPI> => {
  const response = await getWithRetry(url, opts);
  const html = await response.text();
  return cheerio.load(html, opts?.cheerio);
};

type MaybeTime = string | null | undefined;
type MaybeTimeList = MaybeTime[] | RegExpMatchArray | undefined | null;

const normalizeTimes = (times: MaybeTimeList): readonly MaybeTime[] =>
  times ?? [];

export const setIqamaTimes = (
  record: MasjidRecord | undefined,
  times: MaybeTimeList,
): void => {
  if (!record) {
    return;
  }

  const values = normalizeTimes(times);
  record.fajrIqama = values[0] ?? undefined;
  record.zuhrIqama = values[1] ?? undefined;
  record.asrIqama = values[2] ?? undefined;
  record.maghribIqama = values[3] ?? undefined;
  record.ishaIqama = values[4] ?? undefined;
};

export const setJumaTimes = (
  record: MasjidRecord | undefined,
  times: MaybeTimeList,
): void => {
  if (!record) {
    return;
  }

  const values = normalizeTimes(times);
  if (values.length >= 1 && values[0]) {
    record.juma1 = values[0];
  }
  if (values.length >= 2 && values[1]) {
    record.juma2 = values[1];
  }
  if (values.length >= 3 && values[2]) {
    record.juma3 = values[2];
  }
};

export const setTimes = (
  record: MasjidRecord | undefined,
  times: MaybeTimeList,
): void => {
  if (!record) {
    return;
  }

  setIqamaTimes(record, times);
  setJumaTimes(record, normalizeTimes(times).slice(5));
};

export const setIqamaTimesAll = (
  records: MasjidRecord[],
  times: MaybeTimeList,
): void => {
  records.forEach((record) => {
    setIqamaTimes(record, times);
  });
};

export const setJumaTimesAll = (
  records: MasjidRecord[],
  times: MaybeTimeList,
): void => {
  records.forEach((record) => {
    setJumaTimes(record, times);
  });
};

export const setTimesAll = (
  records: MasjidRecord[],
  times: MaybeTimeList,
): void => {
  records.forEach((record) => {
    setTimes(record, times);
  });
};

export const timeRx = /\d{1,2}\s*:\s*\d{1,2}/;
export const timeRxG = /\d{1,2}\s*:\s*\d{1,2}/g;

export const matchTime = (text: string | undefined): RegExpMatchArray | null =>
  text?.match(timeRx) ?? null;

export const extractTime = (text: string | undefined): string => {
  const match = text?.match(timeRx);
  if (match?.length) {
    return match[0];
  }
  return "";
};

export const matchTimeG = (text: string | undefined): RegExpMatchArray | null =>
  text?.match(timeRxG) ?? null;

export const timeAmPmRx = /\d{1,2}\s*:\s*\d{1,2}\s*[ap]\.?m\.?/i;
export const timeAmPmRxG = /\d{1,2}\s*:\s*\d{1,2}\s*[ap]\.?m\.?/gi;

export const matchTimeAmPm = (
  text: string | undefined,
): RegExpMatchArray | null => text?.match(timeAmPmRx) ?? null;

export const extractTimeAmPm = (text: string | undefined): string => {
  const match = text?.match(timeAmPmRx);
  if (match?.length) {
    return match[0];
  }
  return "";
};

export const matchTimeAmPmG = (
  text: string | undefined,
): RegExpMatchArray | null => text?.match(timeAmPmRxG) ?? null;

export const hourMinuteAmPmToMinutes = (hm: string | undefined): number => {
  const match = hm?.match(/(\d{1,2})\s*:\s*(\d{1,2})\s*([ap]\.?m\.?)/i);
  if (!match) {
    throw new Error(`invalid time format: ${hm}`);
  }

  const [, hourText, minuteText, ampmText] = match;
  if (!hourText || !minuteText || !ampmText) {
    throw new Error(`invalid time format: ${hm}`);
  }

  const hourRaw = Number.parseInt(hourText, 10);
  const minuteRaw = Number.parseInt(minuteText, 10);
  const ampm = ampmText.toLowerCase();

  if (!Number.isFinite(hourRaw) || !Number.isFinite(minuteRaw)) {
    throw new Error(`invalid time value: ${hm}`);
  }

  if (hourRaw < 1 || hourRaw > 12 || minuteRaw < 0 || minuteRaw > 59) {
    throw new Error(`invalid time value: ${hm}`);
  }

  let hour = hourRaw;
  if (hour === 12) {
    hour = 0;
  }
  if (ampm.startsWith("p")) {
    hour += 12;
  }

  return hour * 60 + minuteRaw;
};

export const minutesTohourMinute = (minuteValue: number | string): string => {
  const minuteInt = Number(minuteValue);
  if (!Number.isFinite(minuteInt)) {
    throw new Error(`invalid minute value: ${minuteValue}`);
  }

  const dayMinutes = 24 * 60;
  const normalized =
    ((Math.trunc(minuteInt) % dayMinutes) + dayMinutes) % dayMinutes;
  const hour = Math.floor(normalized / 60);
  const minute = String(normalized % 60).padStart(2, "0");

  return `${hour}:${minute}`;
};

export const minuteOffsetFromText = (text: string | undefined): number => {
  const match = text?.match(/([+-])\s*(\d+)/);
  if (!match) {
    throw new Error(`invalid minute offset: ${text}`);
  }

  const [, sign, minuteText] = match;
  if (!sign || !minuteText) {
    throw new Error(`invalid minute offset: ${text}`);
  }

  const minutes = Number.parseInt(minuteText, 10);
  return sign === "-" ? -minutes : minutes;
};

export const mapToText = (
  $: cheerio.CheerioAPI,
  selector: string,
  root?: unknown,
): string[] =>
  $(selector, root as never)
    .map((_, value) => $(value).text().trim())
    .toArray();

export const mapToTextPreserveBreaks = (
  $: cheerio.CheerioAPI,
  selector: string,
  root?: unknown,
): string[] => {
  $(selector, root as never)
    .find("br")
    .replaceWith("\n");
  return $(selector, root as never)
    .map((_, value) => $(value).text().trim())
    .toArray();
};

export const toText = (
  $: cheerio.CheerioAPI,
  selector: string,
  root?: unknown,
): string =>
  $(selector, root as never)
    .text()
    .trim();

export interface PuppeteerEvalLike {
  $$eval<T>(
    selector: string,
    pageFunction: (elements: Array<{ textContent: string | null }>) => T,
  ): Promise<T>;
}

export interface PuppeteerElementHandleLike extends PuppeteerEvalLike {}

export interface PuppeteerFrameLike {
  $(selector: string): Promise<PuppeteerElementHandleLike | null>;
  $$eval<T>(
    selector: string,
    pageFunction: (elements: Array<{ textContent: string | null }>) => T,
  ): Promise<T>;
  url(): string;
  name(): string;
  childFrames(): PuppeteerFrameLike[];
  waitForSelector(selector: string): Promise<PuppeteerElementHandleLike | null>;
}

export interface PuppeteerPageLike {
  $$eval<T>(
    selector: string,
    pageFunction: (elements: Array<{ textContent: string | null }>) => T,
  ): Promise<T>;
  $(selector: string): Promise<PuppeteerElementHandleLike | null>;
  waitForSelector(selector: string): Promise<PuppeteerElementHandleLike | null>;
  on(eventName: "framenavigated", listener: (frame: unknown) => void): void;
  mainFrame(): PuppeteerFrameLike;
}

export const pptMapToText = async (
  page: PuppeteerEvalLike,
  selector: string,
): Promise<string[]> =>
  page.$$eval(selector, (elements) =>
    elements.map((element) => {
      const text = element.textContent;
      return typeof text === "string" ? text.trim() : "";
    }),
  );

export const waitForFrame = async (
  page: PuppeteerPageLike,
  urlFragment: string,
  timeoutMs = 10_000,
): Promise<PuppeteerFrameLike> => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const timeoutPromise = new Promise<PuppeteerFrameLike>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error("timed out"));
    }, timeoutMs);
  });

  const framePromise = new Promise<PuppeteerFrameLike>((resolve) => {
    page.on("framenavigated", (frame) => {
      if (
        typeof frame === "object" &&
        frame !== null &&
        "url" in frame &&
        typeof frame.url === "function" &&
        frame.url().includes(urlFragment)
      ) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        resolve(frame as PuppeteerFrameLike);
      }
    });
  });

  return Promise.race([framePromise, timeoutPromise]);
};

export const dumpFrameTree = (page: PuppeteerPageLike): void => {
  const walk = (frame: PuppeteerFrameLike, indent: string): void => {
    console.error(`${indent}name: ${frame.name()} url: ${frame.url()}`);
    for (const child of frame.childFrames()) {
      walk(child, `${indent}  `);
    }
  };

  walk(page.mainFrame(), "");
};

export const strftime = (fmt: string, input?: { timeZoneId: string }): string =>
  us(Date.now(), input?.timeZoneId ?? "UTC", fmt);

export const isJumaToday = (input?: { timeZoneId: string }): boolean => {
  const day = us(Date.now(), input?.timeZoneId ?? "UTC", "%u");
  return day === "5";
};

export const shuffle = <T>(items: T[]): T[] => {
  let i = items.length;
  while (i) {
    const j = Math.floor(Math.random() * i);
    i -= 1;
    const atI = items[i];
    const atJ = items[j];
    if (atI === undefined || atJ === undefined) {
      break;
    }
    items[i] = atJ;
    items[j] = atI;
  }
  return items;
};
