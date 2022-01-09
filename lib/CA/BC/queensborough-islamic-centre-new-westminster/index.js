const util = require('../../../util')

const ids = [
  {
    uuid4: 'b8d65560-ac51-4b19-87a0-8b28b2c0e117',
    name: 'Queensborough Islamic Centre',
    url: 'http://www.awqat.net/Masjids/BCQueensBNW/qbnw.html',
    timeZoneId: 'America/Vancouver',
    address: '205 Wood St, New Westminster, BC V3M 5K5, Canada',
    placeId: 'ChIJiWIvprXZhVQRmOJtO9CpO7s',
    geo: {
      latitude: 49.1871085,
      longitude: -122.9369715
    }
  }
]

exports.run = async () => {
  const $ = await util.load('http://www.awqat.net/Masjids/BCQueensBNW/qbnw.html')

  $('tr:contains("Zawal")').remove()
  $('tr:contains("Sunrise")').remove()

  const a = util.mapToText($, '.prayer_entry:last-child')
  const j = util.mapToText($, '.prayer_entry:nth-child(2)').slice(5)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)
  return ids
}

exports.ids = ids
