import {
  extractSunsetOffsetMinutes,
  sunsetOffsetClock,
} from "../../../suntime";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

interface PrayerCard {
  heading: string;
  text: string;
}

const normalizeText = (value: string): string =>
  value.replace(/\s+/g, " ").trim();

const normalizeClock = (value: string): string => {
  const amPmMatch = value.match(/(\d{1,2})\s*:\s*(\d{1,2})\s*([ap])\.?m?\.?/i);
  if (amPmMatch?.[1] && amPmMatch[2] && amPmMatch[3]) {
    return `${Number(amPmMatch[1])}:${amPmMatch[2].padStart(2, "0")} ${amPmMatch[3].toUpperCase()}M`;
  }

  const clockMatch = value.match(/(\d{1,2})\s*:\s*(\d{1,2})/);
  if (clockMatch?.[1] && clockMatch[2]) {
    return `${Number(clockMatch[1])}:${clockMatch[2].padStart(2, "0")}`;
  }

  return "";
};

const readPrayerCards = (cards: PrayerCard[], pattern: RegExp): string => {
  const match = cards.find((card) => pattern.test(card.heading));
  return match?.text ?? "";
};

const extractClock = (
  text: string,
  prayer: "asr" | "fajr" | "isha" | "maghrib" | "zuhr",
): string => {
  const cleaned = normalizeText(text);
  const extracted = util.extractTimeAmPm(cleaned) || util.extractTime(cleaned);
  if (extracted) {
    return normalizeClock(extracted);
  }

  if (prayer === "maghrib") {
    const offsetMinutes = extractSunsetOffsetMinutes(cleaned);
    if (offsetMinutes !== null) {
      return sunsetOffsetClock(ids[0], offsetMinutes);
    }
  }

  return "";
};

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "6ca13c10-c2ef-4c49-aec3-3277c0be1cf7",
    name: "Islamic Association of The Colony",
    url: "https://iatcus.org/prayer-time",
    timeZoneId: "America/Chicago",
    address: "5201 S Colony Blvd #535, The Colony, TX 75056, USA",
    placeId: "ChIJU-M_XAA7TIYR95WwzV0YRaY",
    geo: {
      latitude: 33.0857247,
      longitude: -96.8787624,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const headings = util
    .mapToText($, "h4[data-aid^=ABOUT_HEADLINE_RENDERED]")
    .map((value) => normalizeText(value).toLowerCase());
  const descriptions = util
    .mapToText($, "div[data-aid^=ABOUT_DESCRIPTION_RENDERED]")
    .map(normalizeText);
  const cards = headings.map((heading, index) => ({
    heading,
    text: descriptions[index] ?? "",
  }));

  if (cards.length === 0) {
    throw new Error("unexpected prayer-time cards: none found");
  }

  const fajr = extractClock(readPrayerCards(cards, /fajr/i), "fajr");
  const zuhr = extractClock(
    readPrayerCards(cards, /duhur|dhuhr|zuhr/i),
    "zuhr",
  );
  const asr = extractClock(readPrayerCards(cards, /asar|asr/i), "asr");
  const maghrib = extractClock(readPrayerCards(cards, /maghrib/i), "maghrib");
  const isha = extractClock(readPrayerCards(cards, /isha/i), "isha");

  if (!fajr || !zuhr || !asr || !maghrib || !isha) {
    throw new Error("unexpected prayer-time cards: missing iqama times");
  }

  const jumaText = readPrayerCards(cards, /jumah|jummah|jumuah|juma/i);
  const jumaTimes = (jumaText.match(util.timeAmPmRxG) ?? [])
    .map((value) => normalizeClock(value))
    .filter((value): value is string => Boolean(value))
    .slice(0, 3);

  util.setIqamaTimes(ids[0], [fajr, zuhr, asr, maghrib, isha]);
  util.setJumaTimes(ids[0], jumaTimes);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/islamic-association-of-the-colony-the-colony",
  ids,
  run,
};
