import axios from "axios";
import * as cheerio from "cheerio";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "e8ba38bf-3c61-4e3f-8167-9e6c0c770dea",
    name: "Masjid Al-Islam",
    address: "560 E N Frontage Rd, Bolingbrook, IL 60440, USA",
    placeId: "ChIJqbAvBARbDogRZHT8ue9eZD4",
    timeZoneId: "America/Chicago",
    url: "http://bolingbrookmasjid.com",
    geo: {
      latitude: 41.698385,
      longitude: -88.044029,
    },
  },
  {
    uuid4: "f15a753e-bae3-4f37-a81c-d352cb8eec72",
    name: "Masjid Al-Jumu'ah",
    address: "351 Veterans Pkwy, Bolingbrook, IL 60490, USA",
    placeId: "ChIJGe_RdBdZDogRrHICztUkdME",
    timeZoneId: "America/Chicago",
    url: "http://bolingbrookmasjid.com",
    geo: {
      latitude: 41.688226,
      longitude: -88.118169,
    },
  },
];
const run = async () => {
  const response = await axios.get("http://bolingbrookmasjid.com");
  const $ = cheerio.load(response.data);

  ids[0].fajrIqama = $('table.prayer_table td:contains("Fajr") ~ td')
    .eq(-1)
    .text()
    .trim();
  ids[0].zuhrIqama = $('table.prayer_table td:contains("Dhuhr") ~ td')
    .eq(-1)
    .text()
    .trim();
  ids[0].asrIqama = $('table.prayer_table td:contains("Asr") ~ td')
    .eq(-1)
    .text()
    .trim();
  ids[0].maghribIqama = $('table.prayer_table td:contains("Maghrib") ~ td')
    .eq(-1)
    .text()
    .trim();
  ids[0].ishaIqama = $('table.prayer_table td:contains("Isha") ~ td')
    .eq(-1)
    .text()
    .trim();
  ids[0].juma1 = $('table.prayer_table td:contains("First Jumuah") + td')
    .text()
    .trim();
  ids[0].juma2 = $('table.prayer_table td:contains("Second Jumuah") + td')
    .text()
    .trim();

  const second = ids[1];
  if (second) {
    second.fajrIqama = $('table.prayer_table td:contains("Fajr") ~ td')
      .eq(-1)
      .text()
      .trim();
    second.zuhrIqama = $('table.prayer_table td:contains("Dhuhr") ~ td')
      .eq(-1)
      .text()
      .trim();
    second.asrIqama = $('table.prayer_table td:contains("Asr") ~ td')
      .eq(-1)
      .text()
      .trim();
    second.maghribIqama = $('table.prayer_table td:contains("Maghrib") ~ td')
      .eq(-1)
      .text()
      .trim();
    second.ishaIqama = $('table.prayer_table td:contains("Isha") ~ td')
      .eq(-1)
      .text()
      .trim();
    second.juma1 = $('table.prayer_table td:contains("First Jumuah") + td')
      .text()
      .trim();
    second.juma2 = $('table.prayer_table td:contains("Second Jumuah") + td')
      .text()
      .trim();
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/muslim-association-of-bolingbrook",
  ids,
  run,
};
