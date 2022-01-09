const util = require('../../../util')

const ids = [
  {
    uuid4: '0745c2e6-9490-4ae1-9522-1082c63a0496',
    name: 'Guildford Islamic Cultural Center (GICC)',
    url: 'https://giccmasjid.org/',
    timeZoneId: 'America/Vancouver',
    address: '15290 103 A Ave #101, Surrey, BC V3R 7P8, Canada',
    placeId: 'ChIJs0qRRRHXhVQRFThmClsZJeY',
    geo: {
      latitude: 49.19003500000001,
      longitude: -122.7981364
    }
  }
]

exports.run = async () => {
  const $ = await util.load('http://www.awqat.net/Masjids/BCGuildford/guildford.html')

  $('tr:contains("Zawal")').remove()
  $('tr:contains("Sunrise")').remove()

  const a = util.mapToText($, '.prayer_entry:last-child')
  const j = util.mapToText($, '.prayer_entry:nth-child(2)').slice(5)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)
  return ids
}

exports.ids = ids
