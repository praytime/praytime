
const util = require('../../../util')

const ids = [
  {
    uuid4: 'd332b31d-9a13-4cc3-a474-914ebe08adb6',
    name: 'IAGD',
    url: 'http://iagd.net/',
    timeZoneId: 'America/Detroit',
    address: '879 W Auburn Rd, Rochester Hills, MI 48307, USA',
    placeId: 'ChIJq0Ul5DvCJIgROr_UW7UjMfI',
    geo: {
      latitude: 42.6347525,
      longitude: -83.1495202
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.table-striped td:last-child')
  const j = util.mapToText($, '.table-striped td')
    .filter(util.matchTimeAmPm)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j.slice(-2))

  return ids
}

exports.ids = ids
