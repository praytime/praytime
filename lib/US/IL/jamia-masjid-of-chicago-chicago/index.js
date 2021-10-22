const util = require('../../../util')

const ids = [
  {
    uuid4: '40dfeb6d-3b43-4840-a898-6be7f73dd47c',
    name: 'Jamia Masjid of Chicago',
    url: 'https://www.northsidemosque.org/jama-masjid-chicago/',
    timeZoneId: 'America/Chicago',
    address: '6340 N Campbell Ave, Chicago, IL 60659, USA',
    placeId: 'ChIJ276ddN7RD4gRUJhed03Yh-0',
    geo: {
      latitude: 41.9970301,
      longitude: -87.69291199999999
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = ['FAJR', 'ZUHR', 'ASR', 'MAGHRIB', 'ISHA'].map((t) => $(`td:contains("${t}") + td`).text().trim())
  const j = util.mapToText($, 'td:contains("JUMA") + td')

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}
exports.ids = ids
