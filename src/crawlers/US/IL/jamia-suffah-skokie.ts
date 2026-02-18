import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const PRAYER_PAGE_URL = "https://suffaheducational.org/";

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
    uuid4: "25ee35dc-430d-4b43-8b99-191b3a5f88b8",
    name: "Jamia Suffah",
    url: "https://jamiasuffah.org/",
    timeZoneId: "America/Chicago",
    address: "3929 Oakton St, Skokie, IL 60076, USA",
    placeId: "ChIJn9eKCMXPD4gR1SxGn3VEY4I",
    geo: {
      latitude: 42.0260405,
      longitude: -87.72690059999999,
    },
  },
];

const run = async () => {
  const $ = await util.load(PRAYER_PAGE_URL);
  const timetable = $("table.dptTimetable").first();
  if (!timetable.length) {
    throw new Error("missing timetable on Suffah Educational homepage");
  }

  const iqamaByPrayer = new Map<PrayerKey, string>();
  for (const row of timetable.find("tr").toArray()) {
    const prayerKey = toPrayerKey(
      $(row).find("th.prayerName").first().text().trim(),
    );
    if (!prayerKey || iqamaByPrayer.has(prayerKey)) {
      continue;
    }

    const iqamaText = $(row).find("td.jamah").first().text().trim();
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
    throw new Error("incomplete iqama times on Suffah Educational timetable");
  }

  let jumaTimes = timetable
    .find("span.dsJumuah")
    .toArray()
    .map((value) => util.extractTimeAmPm($(value).text()))
    .filter((value) => value.length > 0);

  if (jumaTimes.length === 0) {
    const jumaRowText = timetable
      .find("th.prayerName")
      .filter((_, value) => $(value).text().toLowerCase().includes("jumu"))
      .first()
      .closest("tr")
      .find("td.jamah")
      .first()
      .text();
    jumaTimes = [...new Set(util.matchTimeAmPmG(jumaRowText) ?? [])];
  }

  if (jumaTimes.length === 0) {
    throw new Error("missing Juma times on Suffah Educational timetable");
  }

  util.setIqamaTimes(ids[0], iqamaTimes);
  util.setJumaTimes(ids[0], jumaTimes.slice(0, 3));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/jamia-suffah-skokie",
  ids,
  run,
};
