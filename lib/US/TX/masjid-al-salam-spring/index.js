
const util = require('../../../util')

const ids = [
  {
    uuid4: '652ef10c-b8d9-4491-a80b-e0ef890c8bc2',
    name: 'Masjid Al Salam',
    url: 'http://www.masjidalsalam.org/',
    timeZoneId: 'America/Chicago',
    address: '16700 Old Louetta Rd, Spring, TX 77379, USA',
    placeId: 'ChIJMzgaXJ3SQIYRm1GiuP2fH78',
    geo: {
      latitude: 30.0090816,
      longitude: -95.5601962
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const pt = $('th:contains("IQAMAH")').closest('table')
  const a = util.mapToText($, 'td:last-child', pt)
    .filter(t => t.length)
  const j = util.mapToText($, 'tr:contains("Jummah") td:nth-child(2)', pt)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
