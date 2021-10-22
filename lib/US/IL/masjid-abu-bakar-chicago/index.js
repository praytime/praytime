const util = require('../../../util')

const ids = [
  {
    uuid4: '27facd3d-105c-44ad-a5c1-34c174f642e0',
    name: 'Masjid Abu Bakar',
    url: 'https://www.northsidemosque.org/abu-bakr-masjid-roscoe/',
    timeZoneId: 'America/Chicago',
    address: '1017 W Roscoe St, Chicago, IL 60657, USA',
    placeId: 'ChIJj4TPr63TD4gRKRjzHqw8lvY',
    geo: {
      latitude: 41.9434241,
      longitude: -87.65518879999999
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
