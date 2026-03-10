import type { CrawlerIds, CrawlerRun } from "./types";
import * as util from "./util";

type PrayerKey = util.StandardPrayerKey;

type DptTimetableOptions = {
  errorContext: string;
  jumaSelector?: string;
  jumaTextFallbackSelector?: string;
  tableSelector?: string;
};

const toPrayerKey = (text: string): PrayerKey | "" =>
  util.getStandardPrayerKey(text);

const uniqueTimes = (times: string[]): string[] =>
  Array.from(new Set(times.filter((time) => time.length > 0)));

const rowJumaTimes = (
  timetable: ReturnType<Awaited<ReturnType<typeof util.load>>>,
  $: Awaited<ReturnType<typeof util.load>>,
): string[] => {
  const jumaHeader = timetable
    .find("th.prayerName")
    .toArray()
    .find((value) => $(value).text().toLowerCase().includes("jumu"));
  const jumaRowText = jumaHeader ? $(jumaHeader).closest("tr").text() : "";

  return uniqueTimes(util.matchTimeAmPmG(jumaRowText) ?? []);
};

export const loadDptTimetableTimes = async (
  url: string,
  options: DptTimetableOptions,
): Promise<{ iqamaTimes: string[]; jumaTimes: string[] }> => {
  const $ = await util.load(url);
  const timetable = $(options.tableSelector ?? "table.dptTimetable").first();
  if (!timetable.length) {
    throw new Error(`missing timetable on ${options.errorContext}`);
  }

  const iqamaByPrayer = new Map<PrayerKey, string>();
  for (const row of timetable.find("tr").toArray()) {
    const prayerKey = toPrayerKey(
      $(row).find("th.prayerName").first().text().trim(),
    );
    if (!prayerKey || iqamaByPrayer.has(prayerKey)) {
      continue;
    }

    const iqama = util.extractTimeAmPm(
      $(row).find("td.jamah").first().text().trim(),
    );
    if (!iqama) {
      continue;
    }

    iqamaByPrayer.set(prayerKey, iqama);
  }

  const iqamaTimes = [
    iqamaByPrayer.get("fajr") ?? "",
    iqamaByPrayer.get("zuhr") ?? "",
    iqamaByPrayer.get("asr") ?? "",
    iqamaByPrayer.get("maghrib") ?? "",
    iqamaByPrayer.get("isha") ?? "",
  ];
  if (iqamaTimes.some((value) => value.length === 0)) {
    throw new Error(`incomplete iqama times on ${options.errorContext}`);
  }

  let jumaTimes = uniqueTimes(
    util
      .mapToText($, options.jumaSelector ?? ".dsJumuah", timetable)
      .map(util.extractTimeAmPm),
  );

  if (jumaTimes.length === 0) {
    jumaTimes = rowJumaTimes(timetable, $);
  }

  if (jumaTimes.length === 0 && options.jumaTextFallbackSelector) {
    jumaTimes = uniqueTimes(
      $(options.jumaTextFallbackSelector)
        .toArray()
        .flatMap((value) => {
          const text = $(value).text();
          if (!/jumu/i.test(text)) {
            return [];
          }

          return util.matchTimeAmPmG(text) ?? [];
        }),
    );
  }

  if (jumaTimes.length === 0) {
    throw new Error(`missing Juma times on ${options.errorContext}`);
  }

  return {
    iqamaTimes,
    jumaTimes,
  };
};

export const createDptTimetableRun = (
  ids: CrawlerIds,
  url: string,
  options: DptTimetableOptions,
): CrawlerRun => {
  return async () => {
    const { iqamaTimes, jumaTimes } = await loadDptTimetableTimes(url, options);

    util.setIqamaTimes(ids[0], iqamaTimes);
    util.setJumaTimes(ids[0], jumaTimes.slice(0, 3));

    return ids;
  };
};
