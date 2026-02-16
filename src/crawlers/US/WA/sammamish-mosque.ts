import * as cheerio from "cheerio";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "e4dfb36d-7b2e-4ce8-8487-e544569ab459",
    name: "Sammamish Mosque",
    url: "http://www.sammamishmosque.com/",
    timeZoneId: "America/Los_Angeles",
    address: "22011 SE 20th St, Sammamish, WA 98075, USA",
    geo: {
      latitude: 47.591208,
      longitude: -122.04579,
    },
    placeId: "ChIJqYkmdyFukFQRZTbGcP7iuvg",
  },
];
const run = async () => {
  const response = await util.get(
    "http://www.muslimfeed.com/timesframe.aspx?mi=2110",
  );
  const $ = cheerio.load(response.data);

  ids[0].fajrIqama = $("#trFajr > td:nth-child(3)").text().trim();
  ids[0].zuhrIqama = $("#trDhuhr > td:nth-child(3)").text().trim();
  ids[0].asrIqama = $("#trAsr > td:nth-child(3)").text().trim();
  ids[0].maghribIqama = $("#trMaghrib > td:nth-child(3)").text().trim();
  ids[0].ishaIqama = $("#trIsha > td:nth-child(3)").text().trim();
  ids[0].juma1 = $("#tblDailyTimes > tbody > tr:nth-child(9) > td:nth-child(2)")
    .text()
    .trim();

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/WA/sammamish-mosque",
  ids,
  run,
};
