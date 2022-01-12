const util = require('../../../util')

const ids = [
  {
    uuid4: 'cca4c95b-5cc9-4ed9-80ff-0f14482f43f5',
    name: 'Masjid Ibrahim (Bethany Musalla)',
    url: 'http://masjid-ibrahim.com/',
    timeZoneId: 'America/Los_Angeles',
    address: '15188 NW Central Dr Suite #208, Portland, OR 97229, USA',
    placeId: 'ChIJn_o6rKUIlVQRVRMG2yOlVT4',
    geo: {
      latitude: 45.5543061,
      longitude: -122.833198
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.jamah')
  const j = util.mapToText($, 'b:contains("Jumah")')
    .map(util.matchTimeAmPmG)
    .flat()

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)
  return ids
}

exports.ids = ids
