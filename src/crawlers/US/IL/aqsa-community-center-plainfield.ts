import * as cheerio from "cheerio";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "a29de6c9-b35b-4c29-956d-f0eda7338c61",
    name: "Al-Aqsa Community Center",
    url: "http://www.accplainfield.org/",
    address: "17940 Bronk Rd, Plainfield, IL 60586, USA",
    placeId: "ChIJu0A5cfKKDogRwwN7sNgCylw",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 41.556664,
      longitude: -88.19109,
    },
  },
];
const run = async () => {
  const response = await util.get("http://www.accplainfield.org/");
  const $ = cheerio.load(response.data);

  ids[0].fajrIqama = $('table#Table_01 td:contains("Fajr") + td').text().trim();
  ids[0].zuhrIqama = $('table#Table_01 td:contains("ZUHR") + td').text().trim();
  ids[0].asrIqama = $('table#Table_01 td:contains("ASR") + td').text().trim();
  ids[0].maghribIqama = $('table#Table_01 td:contains("MAGHRIB") + td')
    .text()
    .trim();
  ids[0].ishaIqama = $('table#Table_01 td:contains("ISHA") + td').text().trim();
  ids[0].juma1 = $('table#Table_01 td:contains("1st Jumu") + td').text().trim();
  ids[0].juma2 = $('table#Table_01 td:contains("2nd Jumu") + td').text().trim();
  // ids[0].juma3 = $('table#Table_01 td:contains("3rd Jumu") + td').text().trim()

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/aqsa-community-center-plainfield",
  ids,
  run,
};
