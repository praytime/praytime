// @ts-nocheck

import axios from "axios";
import * as cheerio from "cheerio";
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "f1da0fa7-6043-4f7c-b319-49ecc9fe0087",
    name: "Muslim Society Inc",
    url: "http://www.muslimsocietyinc.org/",
    address: "1785 Bloomingdale Rd., Glendale Heights, IL 60139, USA",
    placeId: "ChIJ_9tTBZisD4gRB8UhMdNO4zM",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 41.9240867,
      longitude: -88.08072500000002,
    },
  },
];

// ChIJLXNcEpisD4gRdq5lUx4FvkE - dup
const run = async () => {
  const response = await axios.get("https://us.mohid.co/il/nwcs/msi");
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
  name: "US/IL/muslim-society-inc-bloomingdale",
  ids,
  run,
};
