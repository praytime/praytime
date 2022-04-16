
const util = require('../../../util')

const ids = [
  {
    uuid4: '3661afd3-e4a9-4348-9481-1f5e0dbe97e6',
    name: 'Masjid Abu Bakr مسجد',
    url: 'https://coloradomuslimsociety.org/',
    timeZoneId: 'America/Denver',
    address: '2071 S Parker Rd, Denver, CO 80231, USA',
    placeId: 'ChIJh0g_UWR9bIcRj5q9KMelS-c',
    geo: {
      latitude: 39.67891520000001,
      longitude: -104.8769933
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.begins')
  a.splice(1, 1) // remove sunrise
  const j = util.mapToText($, 'th.prayerName:contains("Jumuah") + td')

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
