import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "1b263d44-0d3c-4e51-8ef8-292a43cca1f9",
    name: "Islamic Center of San Gabriel Valley (ICSGV)",
    url: "http://www.icsgv.com/",
    timeZoneId: "America/Los_Angeles",
    address: "19164 E Walnut Dr N, Rowland Heights, CA 91748, USA",
    placeId: "ChIJW0yKg1Yqw4ARE3w2TXosuPE",
    geo: {
      latitude: 33.9949473,
      longitude: -117.8846553,
    },
  },
];

const PRAYER_IFRAME_URL = "https://themasjidapp.org/296/prayers";

const run = async () => {
  const $ = await util.load(PRAYER_IFRAME_URL);
  const prayers = {
    asr: "",
    fajr: "",
    isha: "",
    maghrib: "",
    zuhr: "",
  };
  const juma = new Set<string>();

  $("tbody tr").each((_, row) => {
    const cells = $(row).find("td");
    if (cells.length < 2) {
      return;
    }

    const label = cells.first().text().trim().toLowerCase();
    if (label.includes("jumuah") || label.includes("jumuah")) {
      const times = util.matchTimeAmPmG(cells.last().text().trim()) ?? [];
      times.forEach((time) => {
        juma.add(time);
      });
      return;
    }

    if (cells.length < 3) {
      return;
    }
    const iqama = util.extractTimeAmPm(cells.eq(2).text().trim());

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
    }
  });

  if (
    !prayers.fajr ||
    !prayers.zuhr ||
    !prayers.asr ||
    !prayers.maghrib ||
    !prayers.isha
  ) {
    throw new Error("incomplete masjid app prayer table");
  }

  util.setIqamaTimes(ids[0], [
    prayers.fajr,
    prayers.zuhr,
    prayers.asr,
    prayers.maghrib,
    prayers.isha,
  ]);
  util.setJumaTimes(ids[0], Array.from(juma).slice(0, 3));

  if (!ids[0].juma1) {
    util.setJumaTimes(ids[0], ["check website"]);
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/CA/islamic-center-of-san-gabriel-valley-icsgv-rowland-heights",
  ids,
  run,
};
