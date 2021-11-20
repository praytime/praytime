
const util = require('../../../util')

const ids = [
  {
    uuid4: '5a582b3a-5217-4802-8810-a247b8484a6e',
    name: 'Masjid Ar-Rahman - Islamic Association of Greater Memphis',
    url: 'http://www.masjid-arrahman.org/',
    timeZoneId: 'America/Chicago',
    address: '7906 Lowrance Rd, Memphis, TN 38125, USA',
    placeId: 'ChIJA0CXOZyQf4gRR2rA7UyvTUw',
    geo: {
      latitude: 35.03653609999999,
      longitude: -89.7997101
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, 'h5 > span')
    .filter(util.matchTimeAmPm)
    .map(util.extractTimeAmPm)
  // juma comes first
  const j = [a.shift()]
  a.splice(3, 0, '-') // add maghrib back in

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
