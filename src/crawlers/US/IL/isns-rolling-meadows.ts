import * as cheerio from "cheerio";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "c295f191-1796-45a5-8f07-bc7e6d62c302",
    name: "Islamic Society of Northwest Suburbs",
    url: "http://www.isns.org/",
    address: "3950 Industrial Ave, Rolling Meadows, IL 60008, USA",
    placeId: "ChIJj84qIiKlD4gRhLA-MMcAnAw",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 42.096069,
      longitude: -88.031134,
    },
  },
];
const run = async () => {
  const response = await util.get("https://us.mohid.co/il/nwcs/isnschicago");
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
  name: "US/IL/isns-rolling-meadows",
  ids,
  run,
};
