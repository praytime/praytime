const util = require('../../../util')

const ids = [
  {
    uuid4: '91d08993-8341-4229-97f7-04a156c297aa',
    name: 'Masjid Al-Salaam',
    url: 'http://www.bcmaburnaby.org/',
    timeZoneId: 'America/Vancouver',
    address: '5060 Canada Way, Burnaby, BC V5E 3N2, Canada',
    placeId: 'ChIJTTr9qqd3hlQR22OMEP7HuNw',
    geo: {
      latitude: 49.2400093,
      longitude: -122.9641189
    }
  }
]

exports.run = async () => {
  const $ = await util.load('http://www.awqat.net/Masjids/BCSalam/salam.html')

  $('tr:contains("Zawal")').remove()
  $('tr:contains("Sunrise")').remove()

  const a = util.mapToText($, '.prayer_entry:last-child')
  const j = util.mapToText($, '.prayer_entry:nth-child(2)').slice(5)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)
  return ids
}

exports.ids = ids
