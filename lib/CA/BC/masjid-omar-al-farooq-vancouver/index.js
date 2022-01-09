const util = require('../../../util')

const ids = [
  {
    uuid4: 'ac498995-31d3-488a-ab22-3942e8e831e8',
    name: 'Masjid Omar Al-Farooq',
    url: 'http://www.masjidomar.ca/',
    timeZoneId: 'America/Vancouver',
    address: '1659 E 10th Ave, Vancouver, BC V5N 1X6, Canada',
    placeId: 'ChIJsRYB605xhlQRhY3ZiJngoYY',
    geo: {
      latitude: 49.2616005,
      longitude: -123.0705968
    }
  }
]

exports.run = async () => {
  const $ = await util.load('http://www.awqat.net/Masjids/BCOmar/omar.html')

  const a = util.mapToText($, '.prayer_entry:last-child')
  const j = util.mapToText($, '.prayer_entry:nth-child(2)').slice(5)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
