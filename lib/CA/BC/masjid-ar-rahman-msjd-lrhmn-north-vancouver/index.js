const util = require('../../../util')

const ids = [
  {
    uuid4: '62d852e1-5a57-4642-a123-931f7a760f82',
    name: 'Masjid Ar-Rahman مسجد الرحمن',
    url: 'http://www.northvanmasjid.ca/',
    timeZoneId: 'America/Vancouver',
    address: '1398 15th St W, North Vancouver, BC V7P 1N2, Canada',
    placeId: 'ChIJc4dPUdBxhlQR7fGV-NaP59k',
    geo: {
      latitude: 49.3223786,
      longitude: -123.1129938
    }
  }
]

exports.run = async () => {
  const $ = await util.load('http://www.awqat.net/Masjids/BCRahman/rahman.html')

  $('tr:contains("Zawal")').remove()
  $('tr:contains("Sunrise")').remove()

  const a = util.mapToText($, '.prayer_entry:last-child')
  const j = util.mapToText($, '.prayer_entry:nth-child(2)').slice(5)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)
  return ids
}

exports.ids = ids
