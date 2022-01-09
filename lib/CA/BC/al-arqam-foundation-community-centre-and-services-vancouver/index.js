const util = require('../../../util')

const ids = [
  {
    uuid4: 'cdecd5be-ecfb-440a-90e1-684d4b1fe943',
    name: 'Al Arqam Foundation Community Centre and Services',
    url: 'http://www.arqam.ca/',
    timeZoneId: 'America/Vancouver',
    address: '8250 Fraser St, Vancouver, BC V5X 3X6, Canada',
    placeId: 'ChIJkZZTZUB1hlQRx4G9mNGyMIQ',
    geo: {
      latitude: 49.20967809999999,
      longitude: -123.0907952
    }
  }
]

exports.run = async () => {
  const $ = await util.load('http://www.awqat.net/Masjids/BCAlArqam/bcalarqam.html')

  $('tr:contains("Zawal")').remove()
  $('tr:contains("Sunrise")').remove()

  const a = util.mapToText($, '.prayer_entry:last-child')
  const j = util.mapToText($, '.prayer_entry:nth-child(2)').slice(5)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
