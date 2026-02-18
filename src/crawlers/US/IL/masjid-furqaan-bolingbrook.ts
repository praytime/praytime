import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

type PrayerKey = "fajr" | "zuhr" | "asr" | "maghrib" | "isha";

const toPrayerKey = (text: string): PrayerKey | "" => {
  const value = text.trim().toLowerCase();
  if (value.startsWith("fajr")) {
    return "fajr";
  }
  if (
    value.startsWith("zuhr") ||
    value.startsWith("duhr") ||
    value.startsWith("dhuhr")
  ) {
    return "zuhr";
  }
  if (value.startsWith("asr")) {
    return "asr";
  }
  if (value.startsWith("maghrib")) {
    return "maghrib";
  }
  if (value.startsWith("isha")) {
    return "isha";
  }
  return "";
};

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "3a8fc827-c9b5-496f-acc2-296268a3e980",
    name: "Masjid Furqaan",
    url: "https://bolingbrook.masjidfurqaan.org/",
    timeZoneId: "America/Chicago",
    address: "401 W Boughton Rd, Bolingbrook, IL 60440, USA",
    placeId: "ChIJJbNIRyJbDogRXZVVB0lQREw",
    geo: {
      latitude: 41.7066122,
      longitude: -88.0835115,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);
  const timetable = $("table.dptTimetable").first();
  if (!timetable.length) {
    throw new Error("missing timetable on Masjid Furqaan Bolingbrook homepage");
  }

  const iqamaByPrayer = new Map<PrayerKey, string>();
  for (const row of timetable.find("tr").toArray()) {
    const prayerKey = toPrayerKey(
      $(row).find("th.prayerName").first().text().trim(),
    );
    if (!prayerKey || iqamaByPrayer.has(prayerKey)) {
      continue;
    }

    const iqamaText = $(row).find("td.jamah").first().text();
    const iqama = util.extractTimeAmPm(iqamaText);
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
    throw new Error(
      "incomplete iqama times on Masjid Furqaan Bolingbrook homepage",
    );
  }

  let jumaTimes = [
    ...new Set(util.mapToText($, ".dsJumuah, .dsJumuah-vertical")),
  ]
    .map((value) => util.extractTimeAmPm(value))
    .filter((value) => value.length > 0);

  if (jumaTimes.length === 0) {
    jumaTimes = [
      ...new Set(
        $("h1,h2,h3,h4,h5,p,span,td")
          .toArray()
          .flatMap((value) => {
            const text = $(value).text();
            if (!/jumu/i.test(text)) {
              return [];
            }
            return util.matchTimeAmPmG(text) ?? [];
          }),
      ),
    ];
  }

  if (jumaTimes.length === 0) {
    throw new Error(
      "missing Juma times on Masjid Furqaan Bolingbrook homepage",
    );
  }

  util.setIqamaTimes(ids[0], iqamaTimes);
  util.setJumaTimes(ids[0], jumaTimes.slice(0, 3));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/masjid-furqaan-bolingbrook",
  ids,
  run,
};
