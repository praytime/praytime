import type { CrawlerModule } from "../../../types";

// const util = require('../../../util')

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "de4510cc-7d0a-45b1-875b-5e854169ea50",
    name: "Masjid Dawah",
    url: "http://www.masjiddawah.org/",
    timeZoneId: "America/Chicago",
    address: "5316 W Harrison St, Chicago, IL 60644, USA",
    placeId: "ChIJvwQtNroyDogRbWAFdL1PPCI",
    geo: {
      latitude: 41.8731054,
      longitude: -87.7581124,
    },
  },
];

// exports.run = async () => {
//   const $ = await util.load(ids[0].url)

//   const a = util.mapToText($, 'div#prayer-times div.prayer-row > div:last-child')
//   const j = a[a.length - 1].match(/\d+\s*:\s*\d+\s*\w+/g)

//   util.setIqamaTimes(ids[0], a)
//   util.setJumaTimes(ids[0], j)

//   return ids
// }

export const crawler: CrawlerModule = {
  name: "US/IL/masjid-dawah-chicago",
  ids,
};
