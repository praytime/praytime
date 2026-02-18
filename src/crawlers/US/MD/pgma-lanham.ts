import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "a5c8e3f5-25fe-46d6-813c-e86f8002a7a6",
    name: "Prince George's Muslim Association",
    url: "http://pgmamd.org",
    address: "9150 Lanham Severn Rd, Lanham, MD 20706, USA",
    placeId: "ChIJu9mKv73Bt4kRu9BSvbTPfDU",
    timeZoneId: "America/New_York",
    geo: {
      latitude: 38.967486,
      longitude: -76.856091,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);
  const prayers = {
    asr: "",
    fajr: "",
    isha: "",
    maghrib: "",
    zuhr: "",
  };
  const juma = new Set<string>();

  $("table.salah_timings_class tr").each((_, row) => {
    const cells = $(row).find("td");
    if (cells.length < 2) {
      return;
    }

    const label = cells.first().text().trim().toLowerCase();
    const iqamahCell = cells.length >= 3 ? cells.eq(2) : cells.last();
    const iqamahText = iqamahCell.text().trim();
    const iqamah = util.extractTimeAmPm(iqamahText);

    if (label.includes("fajr")) {
      prayers.fajr = iqamah;
    } else if (label.includes("zuhr") || label.includes("dhuhr")) {
      prayers.zuhr = iqamah;
    } else if (label.includes("asr")) {
      prayers.asr = iqamah;
    } else if (label.includes("maghrib")) {
      prayers.maghrib = iqamah;
    } else if (label.includes("isha")) {
      prayers.isha = iqamah;
    } else if (label.includes("jummah")) {
      const times = util.matchTimeAmPmG(iqamahText) ?? [];
      times.forEach((time) => {
        juma.add(time);
      });
    }
  });

  if (
    !prayers.fajr ||
    !prayers.zuhr ||
    !prayers.asr ||
    !prayers.maghrib ||
    !prayers.isha
  ) {
    throw new Error("incomplete prayer timings table");
  }

  util.setIqamaTimes(ids[0], [
    prayers.fajr,
    prayers.zuhr,
    prayers.asr,
    prayers.maghrib,
    prayers.isha,
  ]);
  util.setJumaTimes(ids[0], Array.from(juma).slice(0, 3));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MD/pgma-lanham",
  ids,
  run,
};
