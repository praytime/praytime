import type { CrawlerIds, CrawlerRun } from "./types";
import * as util from "./util";

type PrayerTimesIqamahRow = {
  asr?: unknown;
  dhuhr?: unknown;
  fajr?: unknown;
  isha?: unknown;
  jummah1?: unknown;
  jummah2?: unknown;
  jummah3?: unknown;
  maghrib?: unknown;
  zuhr?: unknown;
};

type PrayerTimesAjaxResponse = {
  data?: {
    iqamah?: unknown;
  };
  success?: unknown;
};

const loadPrayerTimesAjaxRow = async (
  url: string,
  errorContext: string,
): Promise<PrayerTimesIqamahRow> => {
  const response = await util.loadJson<PrayerTimesAjaxResponse>(url, {
    fetch: {
      body: "action=prayer_times",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    },
  });

  if (response.success !== true) {
    throw new Error(`unexpected ${errorContext} status`);
  }

  const rows = response.data?.iqamah;
  if (!Array.isArray(rows)) {
    throw new Error(`missing iqamah rows in ${errorContext}`);
  }

  const row = rows.find(
    (value): value is PrayerTimesIqamahRow =>
      typeof value === "object" && value !== null,
  );
  if (!row) {
    throw new Error(`empty iqamah rows in ${errorContext}`);
  }

  return row;
};

type PrayerTimesAjaxOptions = {
  errorContext?: string;
  jumaFallback?: string[];
  jumaLimit?: number;
  requireJuma?: boolean;
};

export const createPrayerTimesAjaxRun = (
  ids: CrawlerIds,
  url: string,
  options?: PrayerTimesAjaxOptions,
): CrawlerRun => {
  return async () => {
    const errorContext = options?.errorContext ?? "prayer_times ajax response";
    const row = await loadPrayerTimesAjaxRow(url, errorContext);
    const iqamaTimes = util.requireStandardPrayerTimes(
      {
        asr: util.normalizeLooseClock(row.asr),
        fajr: util.normalizeLooseClock(row.fajr),
        isha: util.normalizeLooseClock(row.isha),
        maghrib: util.normalizeLooseClock(row.maghrib),
        zuhr: util.normalizeLooseClock(row.zuhr ?? row.dhuhr),
      },
      `incomplete iqamah rows in ${errorContext}`,
    );
    const jumaTimes = [row.jummah1, row.jummah2, row.jummah3]
      .map(util.normalizeLooseClock)
      .filter((value): value is string => value.length > 0);
    const resolvedJumaTimes = [
      ...jumaTimes,
      ...(options?.jumaFallback ?? []),
    ].filter(
      (value, index, values) =>
        value.length > 0 && values.indexOf(value) === index,
    );

    if ((options?.requireJuma ?? true) && resolvedJumaTimes.length === 0) {
      throw new Error(`missing juma times in ${errorContext}`);
    }

    util.setIqamaTimes(ids[0], iqamaTimes);
    util.setJumaTimes(
      ids[0],
      resolvedJumaTimes.slice(0, options?.jumaLimit ?? 3),
    );

    return ids;
  };
};
