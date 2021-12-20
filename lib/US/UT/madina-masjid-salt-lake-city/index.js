
const util = require('../../../util')

const ids = [
  {
    uuid4: '53e42a84-ef93-426c-9e88-ee15e233437e',
    name: 'Madina Masjid',
    url: 'http://madinaislamiccenter.org/',
    timeZoneId: 'America/Denver',
    address: '1773 North Temple, Salt Lake City, UT 84116, USA',
    placeId: 'ChIJp1PJuXr0UocR54uBJDdjDjY',
    geo: {
      latitude: 40.7712984,
      longitude: -111.9411984
    }
  }
]

exports.run = async () => {
  const $ = await util.load('https://us.mohid.co/ut/saltlakecity/iscu/masjid/widget/api/index/?m=prayertimings')

  const a = util.mapToText($, '#daily .prayer_iqama_div')
  a.splice(0, 1) // remove header
  const j = util.mapToText($, '#jummah li:contains("Khutba")')
    .map(util.extractTimeAmPm)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
