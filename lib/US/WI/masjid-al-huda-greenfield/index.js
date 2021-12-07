
const util = require('../../../util')

const ids = [
  {
    uuid4: '09622645-d1c4-4f7e-80a0-76335584702c',
    name: 'Masjid Al-Huda',
    url: 'http://www.alhudamke.org/',
    timeZoneId: 'America/Chicago',
    address: '5075 S 43rd St, Greenfield, WI 53220, USA',
    placeId: 'ChIJubt4pAgRBYgR2ZfSrC2sV-s',
    geo: {
      latitude: 42.952504,
      longitude: -87.969048
    }
  }, {
    uuid4: '89eca76f-e4c2-4acd-8014-71c305b33f05',
    name: 'Masjid Al-Huda South Milwaukee',
    url: 'http://www.alhudamke.org/',
    timeZoneId: 'America/Chicago',
    address: '1800 16th Ave, South Milwaukee, WI 53172, USA',
    placeId: 'ChIJaSs2v-cVBYgRwpXiX-Au5DQ',
    geo: {
      latitude: 42.913443,
      longitude: -87.8733
    }
  }, {
    uuid4: '9ebd81cf-ab3e-4cff-a21b-b34a129ec860',
    name: 'Taqwa Mosque',
    url: 'http://alhudamke.org/',
    timeZoneId: 'America/Chicago',
    address: 'N 67th St, Milwaukee, WI 53213, USA',
    placeId: 'ChIJaztCttwaBYgRJaSgMBLjQwc',
    geo: {
      latitude: 43.0315314,
      longitude: -87.9960133
    }
  }
]

exports.run = async () => {
  const $ = await util.load('https://us.mohid.co/wi/milwaukee/alhuda/masjid/widget/api/index/?m=prayertimings')

  const a = util.mapToText($, '#daily .prayer_iqama_div')
  a.splice(0, 1) // remove header
  util.setIqamaTimes(ids[0], a)
  util.setIqamaTimes(ids[1], a)
  util.setIqamaTimes(ids[2], a)

  const j = util.mapToText($, '#jummah li')
  util.setJumaTimes(ids[0], j
    .filter(t => t.match(/gfield.*khutba/i))
    .map(util.extractTimeAmPm))
  util.setJumaTimes(ids[1], j
    .filter(t => t.match(/smke.*khutba/i))
    .map(util.extractTimeAmPm))

  return ids
}

exports.ids = ids
