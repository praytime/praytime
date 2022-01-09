const util = require('../../../util')

const ids = [
  {
    uuid4: '9b52504b-75be-4e9c-9275-adc1d4757217',
    name: 'Masjid Ul-Haqq',
    url: 'http://org.thebcma.com/vancouver/',
    timeZoneId: 'America/Vancouver',
    address: '4162 Welwyn St, Vancouver, BC V5N 3Z2, Canada',
    placeId: 'ChIJP9HvUql2hlQRc1E22SNR5wA',
    geo: {
      latitude: 49.2479376,
      longitude: -123.06975
    }
  }
]

exports.run = async () => {
  const $ = await util.load('http://www.awqat.net/Masjids/BCHaqq/haqq.html')

  $('tr:contains("Zawal")').remove()
  $('tr:contains("Sunrise")').remove()

  const a = util.mapToText($, '.prayer_entry:last-child')
  const j = util.mapToText($, '.prayer_entry:nth-child(2)').slice(5)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)
  return ids
}

exports.ids = ids
