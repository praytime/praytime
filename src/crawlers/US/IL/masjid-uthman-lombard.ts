import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "7b11db40-224a-4762-90ce-1622e8fa7526",
    name: "Masjid Uthman",
    url: "https://www.masjiduthman.org",
    address: "840 Oak Creek Dr, Lombard, IL 60148, USA",
    timeZoneId: "America/Chicago",
    placeId: "ChIJPypuKmhSDogRB1siIxiVoOQ",
    geo: {
      latitude: 41.85092,
      longitude: -88.031379,
    },
  },
];

const PRAYER_PAGE_URL = "https://www.masjiduthman.org/";
type Page = Awaited<ReturnType<typeof util.load>>;

const findPrayerCard = ($: Page, titleRx: RegExp): unknown | null => {
  for (const element of $(".col-payertime").toArray()) {
    const title = $(element).find("h2.elementor-heading-title").first().text();
    if (titleRx.test(title.trim())) {
      return element;
    }
  }
  return null;
};

const getPrayerIqama = ($: Page, titleRx: RegExp): string => {
  const card = findPrayerCard($, titleRx);
  if (!card) {
    return "";
  }

  return (
    util
      .mapToText($, "span.time", card)
      .map((value) => value.trim())
      .find((value) => value.length > 0) ?? ""
  );
};

const getJumaIqamas = ($: Page): string[] => {
  const jumaCard = findPrayerCard($, /^jumu/i);
  if (!jumaCard) {
    return [];
  }

  return util
    .mapToText($, "span.timejummah", jumaCard)
    .map((text) => {
      const matches = util.matchTimeG(text);
      if (!matches || matches.length === 0) {
        return "";
      }
      return matches[matches.length - 1] ?? "";
    })
    .filter((value) => value.length > 0);
};

const run = async () => {
  const $ = await util.load(PRAYER_PAGE_URL);

  const iqamaTimes = [
    getPrayerIqama($, /^fajr/i),
    getPrayerIqama($, /^zuhr/i),
    getPrayerIqama($, /^asr/i),
    getPrayerIqama($, /^(magrib|maghrib)/i),
    getPrayerIqama($, /^isha/i),
  ];

  if (iqamaTimes.some((value) => value.length === 0)) {
    throw new Error("incomplete prayer times on Masjid Uthman homepage");
  }

  const jumaTimes = getJumaIqamas($);
  if (jumaTimes.length === 0) {
    throw new Error("missing juma times on Masjid Uthman homepage");
  }

  util.setIqamaTimes(ids[0], iqamaTimes);
  util.setJumaTimes(ids[0], jumaTimes.slice(0, 3));

  return ids;
};

// ChIJ_8hbXVlSDogRtGqqIUgA4R8 - new construction placeholder?

export const crawler: CrawlerModule = {
  name: "US/IL/masjid-uthman-lombard",
  ids,
  run,
};
