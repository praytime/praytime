import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "ed7c16d4-83ae-4715-9dcd-b046af3998ad",
    name: "Masjid At-Taqwa",
    url: "https://www.masjidattaqwaatlanta.org/",
    timeZoneId: "America/New_York",
    address: "2674 Woodwin Rd, Doraville, GA 30360, USA",
    placeId: "ChIJXdyTIOUJ9YgRHWgJVZXToEE",
    geo: {
      latitude: 33.919032,
      longitude: -84.278033,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);
  const html = $.html();
  const prayerSection = html.match(
    /Salath Timings[\s\S]*?Recent Accouncements/i,
  )?.[0];
  if (!prayerSection) {
    throw new Error("missing Salath Timings section");
  }

  const parseIqama = (label: string): string => {
    const match = prayerSection.match(
      new RegExp(
        String.raw`<td>\s*${label}\s*<\/td>\s*<td>([^<]+)<\/td>\s*<td>([^<]+)<\/td>`,
        "i",
      ),
    );
    return util.normalizeSpace(match?.[2] ?? "");
  };

  const jumaTimes = util.extractMatchedTimes(
    prayerSection.match(
      /<td>\s*Jumu'?ah\s*<\/td>[\s\S]*?<td[^>]*colspan=['"]2['"][^>]*>([\s\S]*?)<\/td>/i,
    )?.[1],
  );

  util.setIqamaTimes(ids[0], [
    parseIqama("Fajr"),
    parseIqama("Dhuhr"),
    parseIqama("Asr"),
    parseIqama("Maghrib"),
    parseIqama("Isha"),
  ]);
  util.setJumaTimes(ids[0], jumaTimes);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/GA/masjid-at-taqwa-doraville",
  ids,
  run,
};
