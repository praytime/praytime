import type { CrawlerModule } from "../../../types";

// const util = require('../../../util')

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "dbbfb350-5673-493e-9c7e-957eef049bfc",
    name: "Masjid Alhidayah - Islamic Society of BC",
    url: "https://theisbc.ca/",
    timeZoneId: "America/Vancouver",
    address: "2626 Kingsway Ave, Port Coquitlam, BC V3C 1T7, Canada",
    placeId: "ChIJcSMPfLJ4hlQRpTtp3HEooyM",
    geo: {
      latitude: 49.2652254,
      longitude: -122.7878528,
    },
  },
];

// exports.run = async () => {
//   const $ = await util.load('http://www.awqat.net/Masjids/Hidayah/hidayah.html')

//   $('tr:contains("Zawal")').remove()
//   $('tr:contains("Sunrise")').remove()

//   const a = util.mapToText($, '.prayer_entry:last-child')
//   const j = util.mapToText($, '.prayer_entry:nth-child(2)').slice(5)

//   util.setIqamaTimes(ids[0], a)
//   util.setJumaTimes(ids[0], j)
//   return ids
// }

export const crawler: CrawlerModule = {
  name: "CA/BC/masjid-alhidayah-islamic-society-of-bc-port-coquitlam",
  ids,
};
