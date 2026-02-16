import * as cheerio from "cheerio";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "c593c46c-da3c-4d90-bfe5-80c4ede6f162",
    name: "Islamic Association of Lewisville-Flower Mound",
    timeZoneId: "America/Chicago",
    url: "https://ialfm.org/",
    address: "2807, 3430 Peters Colony Rd, Flower Mound, TX 75022, USA",
    geo: {
      latitude: 33.035248,
      longitude: -97.083041,
    },
    placeId: "ChIJ4X814jctTIYR3hB4Tie61cI",
  },
];
const run = async () => {
  const response = await util.get(
    "https://us.mohid.co/tx/dallas/ialfm/masjid/widget/api/index/?m=prayertimings",
  );
  const $ = cheerio.load(response.data);

  ids[0].fajrIqama = $(
    "#daily > div.list > ul > li:nth-child(1) > div.prayer_iqama_div",
  )
    .text()
    .trim();
  ids[0].zuhrIqama = $(
    "#daily > div.list > ul > li:nth-child(2) > div.prayer_iqama_div",
  )
    .text()
    .trim();
  ids[0].asrIqama = $(
    "#daily > div.list > ul > li:nth-child(3) > div.prayer_iqama_div",
  )
    .text()
    .trim();
  ids[0].maghribIqama = $(
    "#daily > div.list > ul > li:nth-child(4) > div.prayer_iqama_div",
  )
    .text()
    .trim();
  ids[0].ishaIqama = $(
    "#daily > div.list > ul > li:nth-child(5) > div.prayer_iqama_div",
  )
    .text()
    .trim();
  ids[0].juma1 = $(
    "#jummah > div > ul > li:nth-child(1) > div.prayer_iqama_div",
  )
    .text()
    .trim();

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/islamic-association-of-lewisville-flower-mound",
  ids,
  run,
};
