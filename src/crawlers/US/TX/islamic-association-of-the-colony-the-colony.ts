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

const extractClock = (text: string): string => {
  const cleaned = normalizeText(text);
  const extracted = util.extractTimeAmPm(cleaned) || util.extractTime(cleaned);
  return normalizeClock(extracted);
};

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "6ca13c10-c2ef-4c49-aec3-3277c0be1cf7",
    name: "Islamic Association of The Colony",
    url: "https://iatcus.org/prayer-time",
    timeZoneId: "America/Chicago",
    address: "5201 S Colony Blvd #535, The Colony, TX 75056, USA",
    placeId: "ChIJy9DRp9g6TIYRjqNkxI8vCus",
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

  const fajr = extractClock(readPrayerCards(cards, /fajr/i));
  const zuhr = extractClock(readPrayerCards(cards, /duhur|dhuhr|zuhr/i));
  const asr = extractClock(readPrayerCards(cards, /asar|asr/i));
  const maghrib = extractClock(readPrayerCards(cards, /maghrib/i));
  const isha = extractClock(readPrayerCards(cards, /isha/i));

  if (!fajr || !zuhr || !asr || !isha) {
    throw new Error("unexpected prayer-time cards: missing iqama times");
  }

  const jumaText = readPrayerCards(cards, /jumah|jummah|jumuah|juma/i);
  const jumaTimes = (jumaText.match(util.timeAmPmRxG) ?? [])
    .map((value) => normalizeClock(value))
    .filter((value): value is string => Boolean(value))
    .slice(0, 3);

  util.setIqamaTimes(ids[0], [
    fajr,
    zuhr,
    asr,
    maghrib || "check website",
    isha,
  ]);
  util.setJumaTimes(ids[0], jumaTimes);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/islamic-association-of-the-colony-the-colony",
  ids,
  run,
};
