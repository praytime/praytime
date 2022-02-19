const util = require('../../../util')

const ids = [
  {
    uuid4: 'dfab4495-7f4a-4cf7-998f-d7056fff7e97',
    name: 'McKinney Islamic Association',
    url: 'http://www.mckinneymasjid.org/',
    address: '2940 Eldorado Pkwy, McKinney, TX 75070, USA',
    geo: {
      latitude: 33.169004,
      longitude: -96.66308
    },
    placeId: 'ChIJeYmpKVURTIYRKFS4Iqx0hfY',
    timeZoneId: 'America/Chicago'
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  $('tr:contains("Sunrise")').remove()

  const a = util.mapToText($, '#dsPrayerTimetable td:last-child')

  if (util.isJumaToday(ids[0])) {
    const j = util.matchTimeAmPmG(a[1])
    util.setJumaTimes(ids[0], j)
    a[1] = 'Juma'
  } else {
    const j = a.slice(-1).map(util.matchTimeAmPmG).flat()
    util.setJumaTimes(ids[0], j)
  }

  util.setIqamaTimes(ids[0], a)

  return ids
}
exports.ids = ids
