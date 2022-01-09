const util = require('../../../util')

const ids = [
  {
    uuid4: '896be07a-e7bb-41ff-93db-3fb5912aaaba',
    name: 'Fiji Islamic Center',
    url: 'http://www.awqat.net/Masjids/BCFiji/fiji.html',
    timeZoneId: 'America/Vancouver',
    address: '12988 84 Ave, Surrey, BC V3W 1B3, Canada',
    placeId: 'ChIJWdoG1JvZhVQRTqWMMeahC0I',
    geo: {
      latitude: 49.1547735,
      longitude: -122.8625473
    }
  }
]

exports.run = async () => {
  const $ = await util.load('http://www.awqat.net/Masjids/BCFiji/fiji.html')

  $('tr:contains("Zawal")').remove()
  $('tr:contains("Sunrise")').remove()

  const a = util.mapToText($, '.prayer_entry:last-child')
  const j = util.mapToText($, '.prayer_entry:nth-child(2)').slice(5)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)
  return ids
}

exports.ids = ids
