
const util = require('../../../util')

const ids = [
  {
    uuid4: 'ac03b93d-5d7d-4565-9990-a7b4017ce6a3',
    name: 'Masjid Ibrahim',
    url: 'http://www.masjidibrahimypsilanti.com/',
    timeZoneId: 'America/Detroit',
    address: '315 S Ford Blvd, Ypsilanti, MI 48198, USA',
    placeId: 'ChIJMUt6cJZXO4gRrrLKj8lhQg4',
    geo: {
      latitude: 42.2389668,
      longitude: -83.5793477
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.dptTimetable td:last-child')
  a.splice(1, 1) // remove sunrise
  const j = util.mapToText($, '.jumuah')
    .map((t) => t.match(/\d+\s*:\s*\d+/g))
    .pop()

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
