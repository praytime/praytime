import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const PRAYER_IFRAME_FALLBACK_URL = "https://themasjidapp.org/198/prayers";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "6712513e-e66f-46f8-97d2-63cdc97b9797",
    name: "Muslim Community Center of Greater San Diego",
    url: "http://www.mccsandiego.org/",
    timeZoneId: "America/Los_Angeles",
    address: "14698 Via Fiesta, San Diego, CA 92127, USA",
    placeId: "ChIJbcF35in324ARCBcKMiyQI2U",
    geo: {
      latitude: 32.9919147,
      longitude: -117.1647551,
    },
  },
];
const run = async () => {
  const homepage = await util.load(ids[0].url);
  const prayerIframeUrl =
    homepage('iframe[src*="themasjidapp.org"][src*="/prayers"]')
      .first()
      .attr("src") ?? PRAYER_IFRAME_FALLBACK_URL;
  const $ = await util.load(prayerIframeUrl);

  const prayers = {
    asr: "",
    fajr: "",
    isha: "",
    maghrib: "",
    zuhr: "",
  };
  let jumaTimes: string[] = [];

  $("tbody tr").each((_, row) => {
    const cells = $(row).find("td");
    if (cells.length < 2) {
      return;
    }

    const label = cells.first().text().trim().toLowerCase();
    if (label.includes("jumu")) {
      jumaTimes = [...new Set(util.matchTimeAmPmG(cells.last().text()) ?? [])];
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
  if (jumaTimes.length === 0) {
    throw new Error("missing Juma times on masjid app prayer table");
  }

  util.setIqamaTimes(ids[0], [
    prayers.fajr,
    prayers.zuhr,
    prayers.asr,
    prayers.maghrib,
    prayers.isha,
  ]);
  util.setJumaTimes(ids[0], jumaTimes.slice(0, 3));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/CA/muslim-community-center-of-greater-san-diego-san-diego",
  ids,
  run,
};
