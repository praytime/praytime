import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "1dd45b1c-ec70-449d-9243-b5984cc68c66",
    name: "Islamic Association of Collin County",
    url: "https://planomasjid.org",
    address: "6401 Independence Pkwy, Plano, TX 75023, USA",
    placeId: "ChIJq9bOLqciTIYRCcB6F30aiXQ",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 33.059806,
      longitude: -96.751549,
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

  $("div.prayer-times table tr").each((_, row) => {
    const cells = $(row).find("td");
    if (cells.length < 2) {
      return;
    }

    const label = cells.first().text().trim().toLowerCase();
    const value = cells.last().text().trim();
    const iqama = util.extractTimeAmPm(value);

    if (label.includes("fajr")) {
      prayers.fajr = iqama;
    } else if (label.includes("dhuhr") || label.includes("zuhr")) {
      prayers.zuhr = iqama;
    } else if (label.includes("asr")) {
      prayers.asr = iqama;
    } else if (label.includes("maghrib")) {
      prayers.maghrib = iqama;
    } else if (label.includes("isha")) {
      prayers.isha = iqama;
    } else if (label.includes("jummah")) {
      const matches = util.matchTimeAmPmG(value) ?? [];
      matches.forEach((time) => {
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
    throw new Error("incomplete prayer times table");
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
  name: "US/TX/iacc-plano",
  ids,
  run,
};
