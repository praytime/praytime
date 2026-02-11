// @ts-nocheck
import type { CrawlerModule } from "../../../types";

// const util = require('../../../util')

const ids = [
  {
    uuid4: "73072af9-e6f7-4d60-b020-9ed2ec35fd69",
    name: "Nigerian Islamic Association",
    url: "http://www.nigeriaislamicassociation.org/",
    timeZoneId: "America/Chicago",
    address: "932 W Sheridan Rd, Chicago, IL 60613, USA",
    placeId: "ChIJhxV41LXTD4gRkO6sx27Pw2w",
    geo: {
      latitude: 41.9529769,
      longitude: -87.6534636,
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
  name: "US/IL/nigerian-islamic-association-chicago",
  ids,
};
