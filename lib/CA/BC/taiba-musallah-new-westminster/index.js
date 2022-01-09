const util = require('../../../util')

const ids = [
  {
    uuid4: '38249aab-12d0-4ed0-a642-32fd0e1209d2',
    name: 'Taiba Musallah',
    url: 'https://cicsnw.org/',
    timeZoneId: 'America/Vancouver',
    address: '1206 Kingston St, New Westminster, BC V3M 2R9, Canada',
    placeId: 'ChIJMxgNB9d3hlQRIReL93nDIUE',
    geo: {
      latitude: 49.2098442,
      longitude: -122.9344162
    }
  }
]

exports.run = async () => {
  const $ = await util.load('http://www.awqat.net/Masjids/BCTiba/tiba.html')

  $('tr:contains("Zawal")').remove()
  $('tr:contains("Sunrise")').remove()

  const a = util.mapToText($, '.prayer_entry:last-child')
  const j = util.mapToText($, '.prayer_entry:nth-child(2)').slice(5)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)
  return ids
}

exports.ids = ids
