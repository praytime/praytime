const util = require('../../../util')

const ids = [
  {
    uuid4: '284fee65-1396-487f-b072-53387e4a6458',
    name: 'Masjid-Ur-Rahmah',
    url: 'http://org.thebcma.com/surreyeast/',
    timeZoneId: 'America/Vancouver',
    address: '13585 62 Ave, Surrey, BC V3X 2J3, Canada',
    placeId: 'ChIJT-WCqLDbhVQRlHz7j_kwtOE',
    geo: {
      latitude: 49.115612,
      longitude: -122.8457184
    }
  }
]

exports.run = async () => {
  const $ = await util.load('http://www.awqat.net/Masjids/BCRahmah/rahmah.html')

  $('tr:contains("Zawal")').remove()
  $('tr:contains("Sunrise")').remove()

  const a = util.mapToText($, '.prayer_entry:last-child')
  const j = util.mapToText($, '.prayer_entry:nth-child(2)').slice(5)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)
  return ids
}

exports.ids = ids
