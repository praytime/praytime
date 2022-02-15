const util = require('../../../util')

const ids = [
  {
    uuid4: '41c8c5d6-8006-42eb-861c-ee00d03f207d',
    name: 'Masjid Tawba of Niagara Falls',
    url: 'http://masjidtawba.com/',
    timeZoneId: 'America/New_York',
    address: '1801 Pierce Ave, Niagara Falls, NY 14301, USA',
    placeId: 'ChIJC2poh7dC04kRNin4FKl9WtQ',
    geo: {
      latitude: 43.1015538,
      longitude: -79.0394639
    }
  }
]

exports.run = async () => {
  const $ = await util.load('https://masjidtawba.com/daily-prayer-times/')

  const d = util.mapToText($, '.post-904 h4')
  const a = d.filter((_, i) => i % 2 === 1) // even elements
  const j = d.filter((_, i) => i % 2 === 0) // odd
    .filter(util.matchTime)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
