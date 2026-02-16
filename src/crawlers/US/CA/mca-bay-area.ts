import * as cheerio from "cheerio";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "1b00962b-9568-4cee-95e2-ee2056c9ffbe",
    name: "Muslim Community Association",
    url: "https://www.mcabayarea.org/",
    address: "3003 Scott Blvd, Santa Clara, CA 95054, USA",
    placeId: "ChIJY0jYD4jJj4ARPCSyL7wSOCM",
    timeZoneId: "America/Los_Angeles",
    geo: {
      latitude: 37.376718,
      longitude: -121.959827,
    },
  },
  {
    uuid4: "9926fc63-5281-4aa9-9bc1-3aa96cf44ebb",
    name: "Masjid Al-Noor",
    url: "https://www.mcabayarea.org/",
    address: "1755 Catherine St, Santa Clara, CA 95050, USA",
    placeId: "ChIJhY9EUU7Kj4ARX5CNKSkhU4Y",
    timeZoneId: "America/Los_Angeles",
    geo: {
      latitude: 37.35044,
      longitude: -121.955431,
    },
  },
];
const run = async () => {
  const response = await util.get("https://www.mcabayarea.org/");
  const $ = cheerio.load(response.data);

  const ptDivs = $("div.prayertime");
  const juDivs = $("div.jumuatime");

  const iA1 = ptDivs.eq(0).find('td:contains("Iqamah") ~ td');
  const iA2 = ptDivs.eq(1).find('td:contains("Iqamah") ~ td');

  const j1 = juDivs.eq(0).find('td:contains("Jumaa") + td');
  const j2 = juDivs.eq(1).find('td:contains("Jumaa") + td');

  ids[0].fajrIqama = iA1.eq(0).text();
  ids[0].zuhrIqama = iA1.eq(2).text();
  ids[0].asrIqama = iA1.eq(3).text();
  ids[0].maghribIqama = iA1.eq(4).text();
  ids[0].ishaIqama = iA1.eq(5).text();
  ids[0].juma1 = j1.eq(0).text();
  ids[0].juma2 = j1.eq(1).text();
  // ids[0].juma3 = j1.eq(2).text()

  const second = ids[1];
  if (second) {
    second.fajrIqama = iA2.eq(0).text();
    second.zuhrIqama = iA2.eq(2).text();
    second.asrIqama = iA2.eq(3).text();
    second.maghribIqama = iA2.eq(4).text();
    second.ishaIqama = iA2.eq(5).text();
    second.juma1 = j2.eq(0).text();
    second.juma2 = j2.eq(1).text();
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/CA/mca-bay-area",
  ids,
  run,
};
