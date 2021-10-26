// const util = require('../../../util')

const ids = [
  {
    uuid4: 'd25eb3dc-88c0-49f2-9562-64d8ab73535b',
    name: 'Lakeshore Muslim Community Center',
    url: 'http://www.islamicfinder.org/getitWorld.php?id=107858&lang=',
    timeZoneId: 'America/Chicago',
    address: '2150 W Devon Ave #1w, Chicago, IL 60659, USA',
    placeId: 'ChIJ89HgtMPRD4gRVbWPw8dwu34',
    geo: {
      latitude: 41.998028,
      longitude: -87.68457769999999
    }
  }
]

// exports.run = async () => {
//   const $ = await util.load(ids[0].url)

//   const a = util.mapToText($, 'div#prayer-times div.prayer-row > div:last-child')
//   const j = a[a.length - 1].match(/\d+\s*:\s*\d+\s*\w+/g)

//   util.setIqamaTimes(ids[0], a)
//   util.setJumaTimes(ids[0], j)

//   return ids
// }
exports.ids = ids
