import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "a97bd954-7ddc-4244-91fd-15e0d1898f48",
    name: "Masjid Al-Huda",
    url: "http://www.masjidal-huda.org/",
    timeZoneId: "America/Los_Angeles",
    address: "3880 Smith St, Union City, CA 94587, USA",
    placeId: "ChIJIxHdetmVj4ARLg0REb22r_A",
    geo: {
      latitude: 37.5961509,
      longitude: -122.0786946,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);
  const prayerTimes = new Map<string, string>();

  $("table tr").each((_, row) => {
    const prayerName = $(row).find(".prayerName").first().text().trim();
    const prayerKey = util.getStandardPrayerKey(prayerName);
    if (!prayerKey) {
      return;
    }

    const iqamaTime = util.normalizeLooseClock(
      $(row).find("td.jamah").first().text(),
    );
    if (iqamaTime) {
      prayerTimes.set(prayerKey, iqamaTime);
    }
  });

  util.setIqamaTimes(
    ids[0],
    util.requireStandardPrayerTimes(
      prayerTimes,
      "failed to parse Masjid Al-Huda iqama times",
    ),
  );
  // The site currently publishes Jumu'ah on an image banner rather than
  // machine-readable HTML, so keep a contract-safe placeholder.
  util.setJumaTimes(ids[0], ["check website"]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/CA/masjid-al-huda-union-city",
  ids,
  run,
};
