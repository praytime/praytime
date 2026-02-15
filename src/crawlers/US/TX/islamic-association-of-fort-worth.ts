import type { CrawlerModule } from "../../../types";

// const axios = require('axios')
// const cheerio = require('cheerio')

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "1b621892-d674-44f9-b9ce-6bf939e67323",
    name: "Islamic Association of Fort Worth Dar Un-Noor Center",
    url: "http://dncfw.org/",
    timeZoneId: "America/Chicago",
    address: "5747 Westcreek Dr, Fort Worth, TX 76133, USA",
    geo: {
      latitude: 32.660184,
      longitude: -97.36145,
    },
    placeId: "ChIJW0IhWd1tToYRc2-SuVrbBfc",
  },
];

// exports.run = async () => {
//   const response = await axios.get('http://dncfw.org/')
//   const $ = cheerio.load(response.data)

//   ids[0].fajrIqama = $('#mh_display_prayer_times-2 > div > table:nth-child(2) > tbody > tr:nth-child(1) > td:nth-child(2)').text().trim()
//   ids[0].zuhrIqama = $('#mh_display_prayer_times-2 > div > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2)').text().trim()
//   ids[0].asrIqama = $('#mh_display_prayer_times-2 > div > table:nth-child(2) > tbody > tr:nth-child(3) > td:nth-child(2)').text().trim()
//   ids[0].maghribIqama = $('#mh_display_prayer_times-2 > div > table:nth-child(2) > tbody > tr:nth-child(4) > td:nth-child(2)').text().trim()
//   ids[0].ishaIqama = $('#mh_display_prayer_times-2 > div > table:nth-child(2) > tbody > tr:nth-child(5) > td:nth-child(2)').text().trim()

//   // ids[0].fajrIqama = 'check website'
//   // ids[0].zuhrIqama = 'check website'
//   // ids[0].asrIqama = 'check website'
//   // ids[0].maghribIqama = 'check website'
//   // ids[0].ishaIqama = 'check website'
//   ids[0].juma1 = $('#mh_display_prayer_times-2 > div > table:nth-child(3) > tbody > tr:nth-child(2) > td:nth-child(2)').text().trim()

//   return ids
// }

export const crawler: CrawlerModule = {
  name: "US/TX/islamic-association-of-fort-worth",
  ids,
};
