import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "003db6a8-9c1b-4aed-b2f1-49b07e52dbe2",
    name: "Al-Farooq Masjid",
    url: "http://alfarooqmasjid.org/",
    timeZoneId: "America/New_York",
    address: "442 14th St NW, Atlanta, GA 30318, USA",
    placeId: "ChIJGZ7S8PME9YgRIf2DqOPfFxs",
    geo: {
      latitude: 33.7858232,
      longitude: -84.4015484,
    },
  },
];

const normalizeSpace = (text: string): string =>
  text.replace(/\s+/g, " ").trim();

const run = async () => {
  const $ = await util.load(ids[0].url ?? "");
  const today = $("#prayerSchedule #today");
  if (!today.length) {
    throw new Error("missing Al-Farooq prayer schedule");
  }

  const iqamaByPrayer = new Map<string, string>();
  today.find("tbody tr").each((_, row) => {
    const cells = $(row)
      .find("td")
      .toArray()
      .map((cell) => normalizeSpace($(cell).text()));
    const label = util.getStandardPrayerKey(cells[0] ?? "");
    const iqama = cells[2] ?? "";
    if (label && iqama) {
      iqamaByPrayer.set(label, iqama);
    }
  });

  util.setIqamaTimes(ids[0], [
    iqamaByPrayer.get("fajr") ?? "",
    iqamaByPrayer.get("zuhr") ?? "",
    iqamaByPrayer.get("asr") ?? "",
    "sunset",
    iqamaByPrayer.get("isha") ?? "",
  ]);

  const jumaTimes = [
    ...new Set(
      [
        ...(util.matchTimeAmPmG(today.find("footer").text()) ?? []),
        ...(util.matchTimeAmPmG(
          $('section.masjidAddress:contains("Jummah")').text(),
        ) ?? []),
      ]
        .map((value) => util.extractTimeAmPm(value))
        .filter((value): value is string => Boolean(value)),
    ),
  ];
  util.setJumaTimes(ids[0], jumaTimes.slice(0, 2));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/GA/al-farooq-masjid-atlanta",
  ids,
  run,
};
