// @ts-nocheck

import axios from "axios";
import * as cheerio from "cheerio";
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "8f8e0e7c-31d9-485a-ad3d-fc5f341f31de",
    name: "Islamic Foundation North",
    url: "http://www.ifnonline.com/",
    address: "1751 O'Plaine Rd, Libertyville, IL 60048, USA",
    timeZoneId: "America/Chicago",
    placeId: "ChIJFy2RzbeTD4gREXbuIspB0qU",
    geo: {
      latitude: 42.32792,
      longitude: -87.913179,
    },
  },
];

// dup: https://www.google.com/maps/search/?api=1&query=none&query_place_id=ChIJKQCczbeTD4gRot0ZuNceH-o
const run = async () => {
  const response = await axios.get("http://www.ifnonline.com/");
  const $ = cheerio.load(response.data);

  ids[0].fajrIqama = $("div.salah-times > div:nth-child(2) > p:nth-child(1)")
    .text()
    .trim();
  ids[0].zuhrIqama = "check website"; // $('div.salah-times > div:nth-child(2) > p:nth-child(2)').text().trim()
  ids[0].asrIqama = $(
    "div.salah-times > div:nth-child(2) > p:nth-last-child(3)",
  )
    .text()
    .trim();
  ids[0].maghribIqama = $(
    "div.salah-times > div:nth-child(2) > p:nth-last-child(2)",
  )
    .text()
    .trim();
  ids[0].ishaIqama = $(
    "div.salah-times > div:nth-child(2) > p:nth-last-child(1)",
  )
    .text()
    .trim();
  ids[0].juma1 = $("div.salah-times > div:nth-child(5) > p:nth-child(1)")
    .text()
    .trim();
  ids[0].juma2 = $("div.salah-times > div:nth-child(5) > p:nth-child(5)")
    .text()
    .trim();

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/ifn-libertyville",
  ids,
  run,
};
