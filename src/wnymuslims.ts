import type { CrawlerIds, CrawlerRun } from "./types";
import * as util from "./util";

const WNY_MUSLIMS_TIMINGS_URL = "https://wnymuslims.org/en/mosques_timings";

type WnyMuslimsRunOptions = {
  addressText?: string;
  cardTitle: string;
  jumaTimes?: string[];
  normalizeIqamaSequence?: boolean;
};

const normalizeSpace = (text: string): string =>
  text.replace(/\s+/g, " ").trim();

const parseClockMinutes = (value: string): number => {
  const match = value.match(/(\d{1,2})\s*:\s*(\d{2})\s*([ap])\.?m\.?/i);
  if (!match) {
    return Number.NaN;
  }

  const hours = Number.parseInt(match[1] ?? "", 10) % 12;
  const minutes = Number.parseInt(match[2] ?? "", 10);
  const meridiem = (match[3] ?? "").toLowerCase();
  return hours * 60 + minutes + (meridiem === "p" ? 12 * 60 : 0);
};

const formatClockMinutes = (minutes: number): string => {
  const normalizedMinutes = ((minutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const hours = Math.floor(normalizedMinutes / 60);
  const hour12 = hours % 12 || 12;
  const minuteText = `${normalizedMinutes % 60}`.padStart(2, "0");
  const meridiem = hours >= 12 ? "pm" : "am";
  return `${`${hour12}`.padStart(2, "0")}:${minuteText} ${meridiem}`;
};

const normalizeIqamaSequence = (times: string[]): string[] => {
  let previousMinutes = -1;

  return times.map((value, index) => {
    let minutes = parseClockMinutes(value);
    if (Number.isNaN(minutes)) {
      return value;
    }

    if (index === 0 && minutes >= 12 * 60) {
      minutes -= 12 * 60;
    }

    while (index > 0 && minutes <= previousMinutes) {
      minutes += 12 * 60;
    }

    previousMinutes = minutes;
    return formatClockMinutes(minutes);
  });
};

const loadWnyMuslimsIqamaTimes = async (
  options: WnyMuslimsRunOptions,
): Promise<string[]> => {
  const $ = await util.load(WNY_MUSLIMS_TIMINGS_URL);
  const card = $(".card-body")
    .toArray()
    .find((value) => {
      const title = normalizeSpace($(value).find(".card-title").text());
      const address =
        normalizeSpace($(value).find(".card-text").text()) ||
        normalizeSpace($(value).text());

      return (
        title.includes(options.cardTitle) &&
        (!options.addressText || address.includes(options.addressText))
      );
    });

  if (!card) {
    throw new Error(
      `missing WNY Muslims timings card for ${options.cardTitle}`,
    );
  }

  const iqamaByPrayer = new Map<util.StandardPrayerKey, string>();
  for (const row of $(card).find(".time-table").toArray()) {
    const prayerKey = util.getStandardPrayerKey(
      normalizeSpace($(row).find("h6").text()),
    );
    if (!prayerKey || iqamaByPrayer.has(prayerKey)) {
      continue;
    }

    const parts = normalizeSpace($(row).find("span").text())
      .split("/")
      .map((value) => util.extractTimeAmPm(value) || util.extractTime(value))
      .filter((value): value is string => Boolean(value));
    const iqama = parts.at(-1);
    if (!iqama) {
      continue;
    }

    iqamaByPrayer.set(prayerKey, iqama);
  }

  const iqamaTimes = util.requireStandardPrayerTimes(
    iqamaByPrayer,
    `incomplete WNY Muslims timings for ${options.cardTitle}`,
  );

  return options.normalizeIqamaSequence
    ? normalizeIqamaSequence(iqamaTimes)
    : iqamaTimes;
};

export const createWnyMuslimsRun = (
  ids: CrawlerIds,
  options: WnyMuslimsRunOptions,
): CrawlerRun => {
  return async () => {
    const iqamaTimes = await loadWnyMuslimsIqamaTimes(options);

    util.setIqamaTimes(ids[0], iqamaTimes);
    if (options.jumaTimes?.length) {
      util.setJumaTimes(ids[0], options.jumaTimes);
    }

    return ids;
  };
};
