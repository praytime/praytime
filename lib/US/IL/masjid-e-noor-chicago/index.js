const util = require('../../../util')

const ids = [
  {
    uuid4: '0e791818-dde8-4a7e-ad15-767f93d2a55c',
    name: 'Masjid E Noor',
    url: 'https://www.northsidemosque.org/noor-masjid-chicago/',
    timeZoneId: 'America/Chicago',
    address: '6151 N Greenview Ave, Chicago, IL 60660, USA',
    placeId: 'ChIJFSgXGZjRD4gRz7P06vgb6XQ',
    geo: {
      latitude: 41.9942521,
      longitude: -87.6674718
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
