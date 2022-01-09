const util = require('../../../util')

const ids = [
  {
    uuid4: '9fdbe98b-27fb-4f42-92d4-2ddb130ea15d',
    name: 'Peace River Muslim Association',
    url: 'http://www.awqat.net/Masjids/BCPeaceRiver/bcpeaceriver.html',
    timeZoneId: 'America/Dawson_Creek',
    address: '9715 102 St, Fort St John, BC V1J 4B1, Canada',
    placeId: 'ChIJjYXQNI42klMRTboSgGwNhF4',
    geo: {
      latitude: 56.2441719,
      longitude: -120.8506049
    }
  }
]

exports.run = async () => {
  const $ = await util.load('http://www.awqat.net/Masjids/BCPeaceRiver/bcpeaceriver.html')

  $('tr:contains("Zawal")').remove()
  $('tr:contains("Sunrise")').remove()

  const a = util.mapToText($, '.prayer_entry:last-child')
  const j = util.mapToText($, '.prayer_entry:nth-child(2)').slice(5)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)
  return ids
}

exports.ids = ids
