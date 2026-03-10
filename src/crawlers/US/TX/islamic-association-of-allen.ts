import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const normalizeText = (value: string): string =>
  value.replace(/\u00a0/g, " ").trim();

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "12d8631a-8c92-408c-b8e3-141def46c2d6",
    name: "Islamic Association of Allen",
    url: "https://allenmasjid.com/",
    timeZoneId: "America/Chicago",
    address: "909 Allen Central Dr, Allen, TX 75013, USA",
    geo: {
      latitude: 33.097191,
      longitude: -96.683536,
    },
    placeId: "ChIJfQxsNTYXTIYRg-Qg7f_gLeo",
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const iqamaByPrayer = new Map<string, string>();
  const jumaTimes: string[] = [];

  $("table tr").each((_, row) => {
    const cells = $(row).find("td");
    if (cells.length < 4) {
      return;
    }

    const label = normalizeText(cells.eq(1).text()).toLowerCase();
    const adhan = normalizeText(cells.eq(2).text());
    const iqama = normalizeText(cells.eq(3).text());

    if (label === "fajr") {
      iqamaByPrayer.set("fajr", iqama);
      return;
    }
    if (label === "duhar" || label === "dhuhr") {
      iqamaByPrayer.set("zuhr", iqama);
      return;
    }
    if (label === "asr") {
      iqamaByPrayer.set("asr", iqama);
      return;
    }
    if (label === "maghrib") {
      iqamaByPrayer.set("maghrib", iqama);
      return;
    }
    if (label === "isha") {
      iqamaByPrayer.set("isha", iqama);
      return;
    }
    if (label.startsWith("khutbah")) {
      const time =
        util.extractTimeAmPm(adhan) || util.extractTime(adhan) || adhan;
      if (time) {
        jumaTimes.push(time);
      }
    }
  });

  const iqamaTimes = util.requireStandardPrayerTimes(
    iqamaByPrayer,
    "incomplete iqama rows on Allen Masjid homepage",
  );

  util.setIqamaTimes(ids[0], iqamaTimes);
  util.setJumaTimes(ids[0], jumaTimes);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/islamic-association-of-allen",
  ids,
  run,
};
