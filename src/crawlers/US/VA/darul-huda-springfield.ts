import {
  extractSunsetOffsetMinutes,
  sunsetOffsetClock,
} from "../../../suntime";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "04382a38-b718-4576-8647-e496a9c52cff",
    name: "Darul Huda",
    url: "https://darulhudausa.org/",
    address: "6666 Commerce St, Springfield, VA 22150, USA",
    placeId: "ChIJB3xk3aCyt4kRsfPHQUkEXgk",
    timeZoneId: "America/New_York",
    geo: {
      latitude: 38.779942,
      longitude: -77.175792,
    },
  },
];

const normalizeSpace = (text: string): string =>
  text.replace(/[’]/g, "'").replace(/\s+/g, " ").trim();

const extractSection = (
  text: string,
  label: string,
  nextLabels: string[],
): string => {
  const start = text.indexOf(label);
  if (start === -1) {
    throw new Error(`missing Darul Huda section: ${label}`);
  }

  const tail = text.slice(start + label.length);
  const end = nextLabels
    .map((nextLabel) => tail.indexOf(nextLabel))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0];

  return normalizeSpace(tail.slice(0, end ?? tail.length));
};

const extractPrayerValue = (
  section: string,
  label: string,
  nextLabels: string[],
): string => extractSection(section, label, nextLabels);

const parseDailyIqama = (
  value: string,
  prayer: "asr" | "dhuhr" | "fajr" | "isha" | "maghrib",
): string => {
  const cleaned = normalizeSpace(value);
  const parsed = util.extractTimeAmPm(cleaned);
  if (parsed) {
    if (prayer === "fajr" && /p\.?m/i.test(cleaned)) {
      return parsed.replace(/PM$/i, "AM");
    }
    return parsed;
  }

  if (prayer === "maghrib") {
    const offsetMinutes = extractSunsetOffsetMinutes(cleaned);
    if (offsetMinutes !== null) {
      return sunsetOffsetClock(ids[0], offsetMinutes);
    }
  }

  return "";
};

const run = async () => {
  const $ = await util.load(ids[0].url);
  const bodyText = normalizeSpace($("body").text());

  const jumaLabels = ["1st Jummah", "2nd Jummah"];
  const jumaTimes = jumaLabels.map((label, index) => {
    const section = extractSection(
      bodyText,
      label,
      jumaLabels.slice(index + 1),
    );
    const iqamahMatch = section.match(/Iqamah\s*-\s*([0-9:\sapm.]+)/i);
    const iqamah = util.extractTimeAmPm(iqamahMatch?.[1]);
    if (!iqamah) {
      throw new Error(`failed to parse Darul Huda ${label} iqamah time`);
    }
    return iqamah;
  });

  if (jumaTimes.length !== 2) {
    throw new Error("failed to parse Darul Huda Juma times");
  }

  const dailySection = extractSection(bodyText, "PRAYER TIMINGS", [
    "1st Jummah",
  ]);
  const fajrRaw = extractPrayerValue(dailySection, "Fajr", [
    "Dhuhr",
    "Asr",
    "Maghrib",
    "Isha",
  ]);
  const dhuhrRaw = extractPrayerValue(dailySection, "Dhuhr", [
    "Asr",
    "Maghrib",
    "Isha",
  ]);
  const asrRaw = extractPrayerValue(dailySection, "Asr", ["Maghrib", "Isha"]);
  const maghribRaw = extractPrayerValue(dailySection, "Maghrib", ["Isha"]);
  const ishaRaw = extractPrayerValue(dailySection, "Isha", []);

  const unsupportedValues: string[] = [];
  const fajr = parseDailyIqama(fajrRaw, "fajr");
  if (!fajr) {
    unsupportedValues.push(`Fajr=${fajrRaw}`);
  }

  const dhuhr = parseDailyIqama(dhuhrRaw, "dhuhr");
  if (!dhuhr) {
    unsupportedValues.push(`Dhuhr=${dhuhrRaw}`);
  }

  const asr = parseDailyIqama(asrRaw, "asr");
  if (!asr) {
    unsupportedValues.push(`Asr=${asrRaw}`);
  }

  const maghrib = parseDailyIqama(maghribRaw, "maghrib");
  if (!maghrib) {
    unsupportedValues.push(`Maghrib=${maghribRaw}`);
  }

  const isha = parseDailyIqama(ishaRaw, "isha");
  if (!isha) {
    unsupportedValues.push(`Isha=${ishaRaw}`);
  }

  if (unsupportedValues.length > 0) {
    throw new Error(
      `unsupported Darul Huda daily iqama values: ${unsupportedValues.join("; ")}`,
    );
  }

  util.setIqamaTimes(ids[0], [fajr, dhuhr, asr, maghrib, isha]);
  util.setJumaTimes(ids[0], jumaTimes);
  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/VA/darul-huda-springfield",
  ids,
  run,
};
