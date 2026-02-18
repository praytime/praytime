import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "1d007881-a772-4532-b97b-ce2a97e3e283",
    name: "Islamic Center of Rochester",
    url: "http://theicr.org/",
    timeZoneId: "America/New_York",
    address: "727 Westfall Rd, Rochester, NY 14620, USA",
    placeId: "ChIJRRRUptRK0YkRIQ16KKbN7PI",
    geo: {
      latitude: 43.1142939,
      longitude: -77.6019146,
    },
  },
];

const PRAYER_IFRAME_URL =
  "https://themasjidapp.org/129175/prayers?stylesheet=https://theicr.org/wp-content/uploads/prayer.css";

const run = async () => {
  const $ = await util.load(PRAYER_IFRAME_URL);
  const prayers = {
    asr: "",
    fajr: "",
    isha: "",
    maghrib: "",
    zuhr: "",
  };

  $("tbody tr").each((_, row) => {
    const cells = $(row).find("td");
    if (cells.length < 3) {
      return;
    }

    const label = cells.first().text().trim().toLowerCase();
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
  util.setJumaTimes(ids[0], ["check website"]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NY/islamic-center-of-rochester-rochester",
  ids,
  run,
};
