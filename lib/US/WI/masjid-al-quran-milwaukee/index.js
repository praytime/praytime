
const util = require('../../../util')

const ids = [
  {
    uuid4: '482bb7de-d026-4064-9eb2-6cbe1d0098a4',
    name: 'Masjid Al-Qur\'an',
    url: 'https://www.alquranmke.org/',
    timeZoneId: 'America/Chicago',
    address: '11723 W Brown Deer Rd, Milwaukee, WI 53224, USA',
    placeId: 'ChIJGaXwiZj9BIgRZoLPmCAp_Zw',
    geo: {
      latitude: 43.1764066,
      longitude: -88.0582869
    }
  }
]

exports.run = async () => {
  const $ = await util.load('https://www.alquranmke.org/worship.html')

  const a = util.mapToText($, '.simple-table tr:last-child td')
  const j = util.mapToText($, 'h2:contains("Friday Khutbah")')
    .map(util.extractTimeAmPm)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
