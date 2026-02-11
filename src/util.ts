import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
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

const getWithRetry = async (
  url: string,
  axiosOpts?: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  const attempts = DEFAULT_HTTP_RETRIES + 1;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      return await axios.get(url, {
        timeout: DEFAULT_HTTP_TIMEOUT_MS,
        ...axiosOpts,
      });
    } catch (error: unknown) {
      const err = error as AxiosError;
      const status = err.response?.status;
      const code = err.code;
      const retryable =
        !err.response ||
        (typeof status === "number" && RETRYABLE_STATUS_CODES.has(status)) ||
        (typeof code === "string" && RETRYABLE_ERROR_CODES.has(code));

      if (!retryable || attempt === attempts - 1) {
        throw err;
      }

      await sleep(Math.min(3_000, 500 * 2 ** attempt));
    }
  }

  throw new Error(`request attempts exhausted for ${url}`);
};

export const loadJson = async <T = unknown>(
  url: string,
  opts?: { axios?: AxiosRequestConfig },
): Promise<T> => {
  const response = await getWithRetry(url, opts?.axios);
  return response.data as T;
};

export const load = async (
  url: string,
  opts?: { axios?: AxiosRequestConfig; cheerio?: cheerio.CheerioOptions },
): Promise<cheerio.CheerioAPI> => {
  const response = await getWithRetry(url, opts?.axios);
  return cheerio.load(String(response.data), opts?.cheerio);
};

type MaybeTime = string | null | undefined;

export const setIqamaTimes = (
  record: MasjidRecord,
  times: readonly MaybeTime[],
): void => {
  record.fajrIqama = times[0] ?? undefined;
  record.zuhrIqama = times[1] ?? undefined;
  record.asrIqama = times[2] ?? undefined;
  record.maghribIqama = times[3] ?? undefined;
  record.ishaIqama = times[4] ?? undefined;
};

export const setJumaTimes = (
  record: MasjidRecord,
  times: readonly MaybeTime[],
): void => {
  if (times.length >= 1 && times[0]) {
    record.juma1 = times[0];
  }
  if (times.length >= 2 && times[1]) {
    record.juma2 = times[1];
  }
  if (times.length >= 3 && times[2]) {
    record.juma3 = times[2];
  }
};

export const setTimes = (
  record: MasjidRecord,
  times: readonly MaybeTime[],
): void => {
  setIqamaTimes(record, times);
  setJumaTimes(record, times.slice(5));
};

export const setIqamaTimesAll = (
  records: MasjidRecord[],
  times: readonly MaybeTime[],
): void => {
  records.forEach((record) => {
    setIqamaTimes(record, times);
  });
};

export const setJumaTimesAll = (
  records: MasjidRecord[],
  times: readonly MaybeTime[],
): void => {
  records.forEach((record) => {
    setJumaTimes(record, times);
  });
};

export const setTimesAll = (
  records: MasjidRecord[],
  times: readonly MaybeTime[],
): void => {
  records.forEach((record) => {
    setTimes(record, times);
  });
};

export const timeRx = /\d{1,2}\s*:\s*\d{1,2}/;
export const timeRxG = /\d{1,2}\s*:\s*\d{1,2}/g;

export const matchTime = (text: string): RegExpMatchArray | null =>
  text.match(timeRx);

export const extractTime = (text: string): string => {
  const match = text.match(timeRx);
  if (match?.length) {
    return match[0];
  }
  return "";
};

export const matchTimeG = (text: string): RegExpMatchArray | null =>
  text.match(timeRxG);

export const timeAmPmRx = /\d{1,2}\s*:\s*\d{1,2}\s*[ap]\.?m\.?/i;
export const timeAmPmRxG = /\d{1,2}\s*:\s*\d{1,2}\s*[ap]\.?m\.?/gi;

export const matchTimeAmPm = (text: string): RegExpMatchArray | null =>
  text.match(timeAmPmRx);

export const extractTimeAmPm = (text: string): string => {
  const match = text.match(timeAmPmRx);
  if (match?.length) {
    return match[0];
  }
  return "";
};

export const matchTimeAmPmG = (text: string): RegExpMatchArray | null =>
  text.match(timeAmPmRxG);

export const hourMinuteAmPmToMinutes = (hm: string): number => {
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

export const minuteOffsetFromText = (text: string): number => {
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

interface PuppeteerFrameLike {
  url(): string;
  name(): string;
  childFrames(): PuppeteerFrameLike[];
}

interface PuppeteerPageLike {
  $$eval<T>(
    selector: string,
    pageFunction: (elements: Array<{ textContent: string | null }>) => T,
  ): Promise<T>;
  on(
    eventName: "framenavigated",
    listener: (frame: PuppeteerFrameLike) => void,
  ): void;
  mainFrame(): PuppeteerFrameLike;
}

export const pptMapToText = async (
  page: PuppeteerPageLike,
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
      if (frame.url().includes(urlFragment)) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        resolve(frame);
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

export const strftime = (
  fmt: string,
  { timeZoneId }: { timeZoneId: string },
): string => us(Date.now(), timeZoneId, fmt);

export const isJumaToday = ({
  timeZoneId,
}: {
  timeZoneId: string;
}): boolean => {
  const day = us(Date.now(), timeZoneId, "%u");
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
