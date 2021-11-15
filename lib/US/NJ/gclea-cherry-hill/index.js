
const util = require('../../../util')

const ids = [
  {
    uuid4: '6941594b-dc0b-4084-a38b-84f844cf02f3',
    name: 'GCLEA',
    url: 'http://www.gclea.org',
    timeZoneId: 'America/New_York',
    address: '5 Esterbrook Ln, Cherry Hill, NJ 08003, USA',
    placeId: 'ChIJXzty6Oo0wYkRLBE9qM3ftKY',
    geo: {
      latitude: 39.913817,
      longitude: -74.968595
    }
  }
]

exports.run = async () => {
  const $ = await util.load('https://us.mohid.co/nj/njrgn/gclea/masjid/widget/api/index/?m=prayertimings')

  const a = util.mapToText($, '.prayer_iqama_div')
  a.shift() // remove header
  util.setTimes(ids[0], a.slice(0, 6))

  return ids
}

exports.ids = ids
