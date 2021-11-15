
const util = require('../../../util')

const ids = [
  {
    uuid4: 'e8f0a693-40f0-4468-a843-f66c146032d9',
    name: 'Islamic Society of Corona ISCN Corona Masjid',
    url: 'http://www.coronamuslims.com/',
    timeZoneId: 'America/Los_Angeles',
    address: '465 Santana Way, Corona, CA 92881, USA',
    placeId: 'ChIJ4zrGMO7H3IARexzj1nbyqUc',
    geo: {
      latitude: 33.851829,
      longitude: -117.56223
    }
  }
]

exports.run = async () => {
  const $ = await util.load('https://us.mohid.co/ca/losangeles/iscn/masjid/widget/api/index/?m=prayertimings')

  const a = util.mapToText($, '.prayer_iqama_div')
  a.splice(0, 1) // remove header
  util.setTimes(ids[0], a)

  return ids
}

exports.ids = ids
