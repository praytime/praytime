import * as cheerio from "cheerio";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const PRAYER_WIDGET_URL =
  "https://us.mohid.co/tx/dallas/icf/masjid/widget/api/index/?m=prayertimings";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "f99c3113-9a6d-4385-8638-d9e688ae96b3",
    name: "Islamic Center of Frisco",
    url: "https://friscomasjid.org/",
    address: "11137 Frisco St, Frisco, TX 75033, USA",
    timeZoneId: "America/Chicago",
    placeId: "ChIJs59GV60-TIYRaz2IAca7nV8",
    geo: {
      latitude: 33.172391,
      longitude: -96.834762,
    },
  },
];
/* jscpd:ignore-start */
const run = async () => {
  const response = await util.get(PRAYER_WIDGET_URL);
  const $ = cheerio.load(response.data);
  const prayerTimes = {
    asr: "",
    fajr: "",
    isha: "",
    maghrib: "",
    zuhr: "",
  };
  const jumaTimes: string[] = [];

  $(".list.arrowB li").each((_, row) => {
    const rowText = $(row).text().replace(/\s+/g, " ").trim();
    if (!rowText) {
      return;
    }

    const iqama = $(row).find(".prayer_iqama_div").first().text().trim();
    const label = rowText.toLowerCase();

    if (label.startsWith("fajr ")) {
      prayerTimes.fajr = iqama;
    } else if (label.startsWith("dhuhr iqama")) {
      return;
    } else if (label.startsWith("dhuhr ")) {
      prayerTimes.zuhr = iqama;
    } else if (label.startsWith("asr ")) {
      prayerTimes.asr = iqama;
    } else if (label.startsWith("maghrib ")) {
      prayerTimes.maghrib = iqama;
    } else if (label.startsWith("isha ")) {
      prayerTimes.isha = iqama;
    } else if (label.startsWith("friday iqama ")) {
      jumaTimes.push(iqama);
    }
  });

  util.setIqamaTimes(ids[0], [
    prayerTimes.fajr,
    prayerTimes.zuhr,
    prayerTimes.asr,
    prayerTimes.maghrib,
    prayerTimes.isha,
  ]);
  util.setJumaTimes(ids[0], jumaTimes);

  return ids;
};
/* jscpd:ignore-end */

export const crawler: CrawlerModule = {
  name: "US/TX/islamic-center-of-frisco",
  ids,
  run,
};
