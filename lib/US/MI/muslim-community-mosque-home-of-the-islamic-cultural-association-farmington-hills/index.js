
const util = require('../../../util')

const ids = [
  {
    uuid4: 'aff2ad30-1602-4edb-a223-f2540f3fb118',
    name: 'Muslim Community Mosque: Home of the Islamic Cultural Association',
    url: 'https://ica-mi.org/',
    timeZoneId: 'America/Detroit',
    address: '35700 W 12 Mile Rd, Farmington Hills, MI 48331, USA',
    placeId: 'ChIJYdTmWhWwJIgRjT_HfCKAB7c',
    geo: {
      latitude: 42.4988203,
      longitude: -83.40092159999999
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.jamah')
  const j = util.mapToText($, '.dptTimetable th')
    .slice(0, 1)
    .map(util.matchTimeAmPmG)
    .shift()

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
