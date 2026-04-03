import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "e5cc492d-4fd9-465e-8f4c-0abbd9dec927",
    name: "Islamic Community Center of Laurel",
    url: "http://www.icclmd.org/",
    timeZoneId: "America/New_York",
    address: "7306 Contee Rd, Laurel, MD 20707, USA",
    placeId: "ChIJERDH4dDct4kRP7ptkJvmB1k",
    geo: {
      latitude: 39.0805959,
      longitude: -76.8800036,
    },
  },
];

const normalizeClock = (value: string | undefined): string =>
  util.extractTimeAmPm(value) || util.extractTime(value);

const normalizeLabel = (value: string): string =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

const run = async () => {
  const $ = await util.load(ids[0].url);
  const prayerSection = $(".prayer-times").first();
  if (!prayerSection.length) {
    throw new Error("missing prayer times section");
  }

  const rows = prayerSection
    .find(".e-con.e-parent")
    .toArray()
    .map((row) =>
      $(row)
        .find("h2.elementor-heading-title")
        .toArray()
        .map((entry) => $(entry).text().replace(/\s+/g, " ").trim())
        .filter((value) => value.length > 0),
    )
    .filter((row) => row.length > 0);

  const iqamaByPrayer = new Map<string, string>();
  const jumaTimes: string[] = [];

  for (const row of rows) {
    const label = normalizeLabel(row[0] ?? "");
    const time = normalizeClock(row.at(-1));
    if (!label || !time) {
      continue;
    }

    if (label === "fajr") {
      iqamaByPrayer.set("fajr", time);
      continue;
    }
    if (label === "dhuhr") {
      iqamaByPrayer.set("dhuhr", time);
      continue;
    }
    if (label === "asr") {
      iqamaByPrayer.set("asr", time);
      continue;
    }
    if (label === "maghrib") {
      iqamaByPrayer.set("maghrib", time);
      continue;
    }
    if (label.startsWith("isha")) {
      iqamaByPrayer.set("isha", time);
      continue;
    }
    if (label.includes("jummah")) {
      jumaTimes.push(time);
    }
  }

  const iqamaTimes = [
    iqamaByPrayer.get("fajr") ?? "",
    iqamaByPrayer.get("dhuhr") ?? "",
    iqamaByPrayer.get("asr") ?? "",
    iqamaByPrayer.get("maghrib") ?? "",
    iqamaByPrayer.get("isha") ?? "",
  ];
  if (iqamaTimes.some((time) => !time)) {
    throw new Error("failed to parse prayer times section");
  }

  util.setIqamaTimes(ids[0], iqamaTimes);
  util.setJumaTimes(ids[0], jumaTimes);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MD/islamic-community-center-of-laurel-laurel",
  ids,
  run,
};
