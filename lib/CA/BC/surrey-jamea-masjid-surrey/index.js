const util = require('../../../util')

const ids = [
  {
    uuid4: 'd810c1d5-65a1-45a9-a6b7-e7f646122836',
    name: 'Surrey Jamea Masjid',
    url: 'http://surrey.thebcma.com/',
    timeZoneId: 'America/Vancouver',
    address: '12407 72 Ave, Surrey, BC V3W 2M5, Canada',
    placeId: 'ChIJ26fzCGLZhVQRcuPQN3P7jHw',
    geo: {
      latitude: 49.1342609,
      longitude: -122.8786961
    }
  }
]

exports.run = async () => {
  const $ = await util.load('http://www.awqat.net/Masjids/BCSurreyMain/surreymain.html')

  $('tr:contains("Zawal")').remove()
  $('tr:contains("Sunrise")').remove()

  const a = util.mapToText($, '.prayer_entry:last-child')
  const j = util.mapToText($, '.prayer_entry:nth-child(2)').slice(5)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)
  return ids
}

exports.ids = ids
