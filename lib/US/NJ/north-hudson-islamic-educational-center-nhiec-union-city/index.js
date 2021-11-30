
const util = require('../../../util')

const ids = [
  {
    uuid4: 'e320b76d-aad7-423f-970c-0c3891fabc37',
    name: 'North Hudson Islamic Educational Center(NHIEC)',
    url: 'http://www.nhiec.com/',
    timeZoneId: 'America/New_York',
    address: '4613 Cottage Pl, Union City, NJ 07087, USA',
    placeId: 'ChIJEUaPpRhYwokRIxIJlMYYPPU',
    geo: {
      latitude: 40.7812446,
      longitude: -74.02344819999999
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.masjidnow-salah-time-iqamah')
  const j = util.mapToText($, '.masjidnow-extra-info')
    .map(util.matchTimeAmPmG)
    .shift()

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
