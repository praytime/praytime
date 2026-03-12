import type { CrawlerIds, CrawlerRun } from "./types";
import * as util from "./util";

type PrayerKey = util.StandardPrayerKey;

type DptTimetableOptions = {
  errorContext: string;
  jumaDefault?: string[];
  jumaSelector?: string;
  jumaTextFallbackSelector?: string;
  requireJuma?: boolean;
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
  const html = $.html();
  const embeddedTimes = util.extractEmbeddedPrayerTimesFromHtml($, html);
  const timetable = $(options.tableSelector ?? "table.dptTimetable").first();
  let iqamaTimes: string[] = [];
  let jumaTimes: string[] = [];

  if (timetable.length) {
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

    try {
      iqamaTimes = util.requireStandardPrayerTimes(
        iqamaByPrayer,
        `incomplete iqama times on ${options.errorContext}`,
      );
    } catch {
      iqamaTimes = [];
    }

    jumaTimes = uniqueTimes(
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
  }

  if (iqamaTimes.length < 5 && embeddedTimes) {
    iqamaTimes = embeddedTimes.iqamaTimes;
  }

  if (jumaTimes.length === 0 && embeddedTimes?.jumaTimes.length) {
    jumaTimes = embeddedTimes.jumaTimes;
  }

  if (iqamaTimes.length < 5) {
    throw new Error(`missing timetable on ${options.errorContext}`);
  }

  if (jumaTimes.length === 0 && options.jumaDefault?.length) {
    jumaTimes = options.jumaDefault;
  }

  if (jumaTimes.length === 0 && options.requireJuma !== false) {
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
