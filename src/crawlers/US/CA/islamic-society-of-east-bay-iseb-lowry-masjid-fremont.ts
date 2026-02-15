import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "da083d17-522f-4d33-9397-e77bf97bd8f7",
    name: "Islamic Society of East Bay (ISEB - Lowry Masjid)",
    url: "http://www.isebfremont.org/",
    timeZoneId: "America/Los_Angeles",
    address: "33330 Peace Terrace, Fremont, CA 94555, USA",
    placeId: "ChIJ4wyLZImVj4ARDSy6nbuCoOQ",
    geo: {
      latitude: 37.5807048,
      longitude: -122.0548534,
    },
  },
];
const run = async () => {
  const $ = await util.load(
    "https://ummahsoft.org/salahtime/masjid-embed/widget_prayer.php?masjid_id=3158",
  );

  util.setTimes(ids[0], util.mapToText($, ".prayer-timing td.col-3").slice(1));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/CA/islamic-society-of-east-bay-iseb-lowry-masjid-fremont",
  ids,
  run,
};
