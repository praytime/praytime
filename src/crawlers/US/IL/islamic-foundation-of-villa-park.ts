import * as cheerio from "cheerio";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "54ebe774-8fb6-4bbd-8824-fa4b0167d766",
    name: "Islamic Foundation",
    url: "http://www.islamicfoundation.org/",
    address: "300 W. Highridge Road, Villa Park, IL 60181, USA",
    timeZoneId: "America/Chicago",
    placeId: "ChIJf-nwNglNDogRCZYLGS4_dKE",
    geo: {
      latitude: 41.86793,
      longitude: -87.985824,
    },
  },
];
const run = async () => {
  const response = await util.get("https://us.mohid.co/il/swcs/ifsvp");
  const $ = cheerio.load(response.data);

  ids[0].fajrIqama = $(
    "#daily > div.list.plusG > ul > li:nth-child(1) > div.prayer_iqama_div",
  )
    .text()
    .trim();
  ids[0].zuhrIqama = $(
    "#daily > div.list.plusG > ul > li:nth-child(2) > div.prayer_iqama_div",
  )
    .text()
    .trim();
  ids[0].asrIqama = $(
    "#daily > div.list.plusG > ul > li:nth-child(3) > div.prayer_iqama_div",
  )
    .text()
    .trim();
  ids[0].maghribIqama = $(
    "#daily > div.list.plusG > ul > li:nth-child(4) > div.prayer_iqama_div",
  )
    .text()
    .trim();
  ids[0].ishaIqama = $(
    "#daily > div.list.plusG > ul > li:nth-child(5) > div.prayer_iqama_div",
  )
    .text()
    .trim();
  ids[0].juma1 = $("#jummah > div > ul > li:nth-child(1) > div.num")
    .text()
    .trim();
  ids[0].juma2 = $("#jummah > div > ul > li:nth-child(3) > div.num")
    .text()
    .trim();

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/islamic-foundation-of-villa-park",
  ids,
  run,
};
