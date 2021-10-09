const util = require('../../../util')

const ids = [
  {
    name: 'Muslim Community Center',
    url: 'https://mccchicago.org',
    address: '4380 N. Elston Ave. Chicago, IL 60641, USA',
    placeId: 'ChIJ0Qry58jND4gR_kzSJ2jJU7c',
    timeZoneId: 'America/Chicago',
    uuid4: '64682fcc-46b2-4438-8a7c-381a23e5c1ef',
    geo: {
      latitude: 41.960308,
      longitude: -87.728960
    }
  },
  {
    name: 'Muslim Education Center',
    url: 'https://mccchicago.org',
    address: '8601 Menard Ave. Morton Grove, IL 60053, USA',
    placeId: 'ChIJBYEW9EnPD4gRgXSGmsX2mb4',
    timeZoneId: 'America/Chicago',
    uuid4: '4b7298fd-773a-40ec-b987-fb5056d68cd5',
    geo: {
      latitude: 42.037729,
      longitude: -87.771120
    }
  },
  {
    name: "O'Hare Airport Terminal 2",
    url: 'https://mccchicago.org',
    address: "10000 W O'Hare Ave, Chicago, IL 60666, USA",
    placeId: 'ChIJ0XqtPia0D4gRGhSGFW4pHV0',
    timeZoneId: 'America/Chicago',
    uuid4: '7465437c-46cd-4e09-96f6-e3fac29ae780',
    geo: {
      latitude: 41.97651,
      longitude: -87.905013
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  // mec
  util.setIqamaTimes(ids[0], util.mapToText($, 'ul.time-list div.time-r').slice(1))
  util.setJumaTimes(ids[0], [
    'check website'
  ])

  // mcc
  util.setIqamaTimes(ids[1], util.mapToText($, 'ul.time-list div.time-l').slice(1))
  util.setJumaTimes(ids[1], [
    'check website',
    'check website'
  ])

  // ohare
  util.setJumaTimes(ids[2], ['check website'])

  return ids
}
exports.ids = ids
