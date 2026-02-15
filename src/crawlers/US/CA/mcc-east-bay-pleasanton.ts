import axios from "axios";
import * as cheerio from "cheerio";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "804b9404-fd76-4eaa-8bcf-547c3cf084ef",
    name: "Muslim Community Center – East Bay",
    url: "https://mcceastbay.org/",
    address: "5724 W Las Positas Blvd #300, Pleasanton, CA 94588, USA",
    placeId: "ChIJ2Xg1Sl3pj4ARyTAXb2SKLOk",
    timeZoneId: "America/Los_Angeles",
    geo: {
      latitude: 37.685514,
      longitude: -121.891138,
    },
  },
];
const run = async () => {
  const response = await axios.get("https://mcceastbay.org/");
  const $ = cheerio.load(response.data);

  const iqamaTimes = $("span.dpt_jamah");

  ids[0].fajrIqama = iqamaTimes.eq(0).text().trim();
  ids[0].zuhrIqama = iqamaTimes.eq(1).text().trim();
  ids[0].asrIqama = iqamaTimes.eq(2).text().trim();
  ids[0].maghribIqama = iqamaTimes.eq(3).text().trim();
  ids[0].ishaIqama = iqamaTimes.eq(4).text().trim();

  ids[0].juma1 = "check website";
  ids[0].juma2 = "check website";

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/CA/mcc-east-bay-pleasanton",
  ids,
  run,
};
