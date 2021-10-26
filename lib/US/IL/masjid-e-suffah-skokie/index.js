// const util = require('../../../util')

const ids = [
  {
    uuid4: 'db5cd228-14e7-450a-8413-dc61f71ffa4b',
    name: 'Masjid-E-Suffah',
    url: 'http://suffaheducational.org/',
    timeZoneId: 'America/Chicago',
    address: '8201 Karlov Ave, Skokie, IL 60076, USA',
    placeId: 'ChIJpzftaKTPD4gRvWsNx2dABas',
    geo: {
      latitude: 42.0300367,
      longitude: -87.7302691
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
