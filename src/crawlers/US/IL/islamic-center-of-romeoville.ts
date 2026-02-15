import axios from "axios";
import * as cheerio from "cheerio";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "a988f430-650d-4918-800d-21be23ca34a1",
    name: "Islamic Center of Romeoville",
    url: "http://thfoundation.com",
    address: "14455 S Budler Rd, Plainfield, IL 60544, USA",
    timeZoneId: "America/Chicago",
    placeId: "ChIJ2eKwWJlfDogRss6NduNi-TM",
    geo: {
      latitude: 41.620172,
      longitude: -88.153147,
    },
  },
];
// ChIJh5E_5ptfDogR7I7hPecDLLk - ta'leem ul haq
const run = async () => {
  const response = await axios.get("http://thfoundation.com");
  const $ = cheerio.load(response.data);

  ids[0].fajrIqama = $("td:contains(Fajr) + td").text().trim();
  ids[0].zuhrIqama = $("td:contains(Zuhar) + td").text().trim();
  ids[0].asrIqama = $("td:contains(Asr) + td").text().trim();
  ids[0].maghribIqama = $("td:contains(Maghrib) + td").text().trim();
  ids[0].ishaIqama = $("td:contains(Isha) + td").text().trim();
  ids[0].juma1 = $("th:contains(Jumu)")
    .text()
    .match(/\d{1,2}:\d{2}/)?.[0];

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/islamic-center-of-romeoville",
  ids,
  run,
};
