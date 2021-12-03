
const util = require('../../../util')

const ids = [
  {
    uuid4: '5874495c-7d84-4816-8049-eb50b3579d26',
    name: 'Islamic Center of Hazelwood Dar Aljalal Masjid',
    url: 'http://www.daraljalal.com/',
    timeZoneId: 'America/Chicago',
    address: '8945 Dunn Rd, Hazelwood, MO 63042, USA',
    placeId: 'ChIJpQ22Tf0234cRuZDj-MYzCLI',
    geo: {
      latitude: 38.77731089999999,
      longitude: -90.3463771
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.dptTimetable td:last-child')
  a.splice(1, 1) // remove sunrise

  if (util.isJumaToday(ids[0])) {
    a[1] = 'juma'
    const j = util.mapToText($, '.jumuah')
      .map(util.matchTimeAmPmG)
      .pop()
    util.setJumaTimes(ids[0], j)
  } else {
    util.setJumaTimes(ids[0], util.matchTimeAmPmG(a[5]))
  }

  util.setIqamaTimes(ids[0], a)

  return ids
}

exports.ids = ids
