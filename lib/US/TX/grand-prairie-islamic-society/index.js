const util = require('../../../util')

const ids = [
  {
    uuid4: '54e2e0f0-a6a5-43d0-82dc-d2ebbb2e7487',
    name: 'Grand Prairie Islamic Society',
    url: 'http://grandprairiemasjid.org/',
    timeZoneId: 'America/Chicago',
    address: 'Suite B, 802 Greenview Dr, Grand Prairie, TX 75050, United States',
    geo: {
      latitude: 32.771838,
      longitude: -97.057007
    },
    placeId: 'ChIJzfstvCOHToYReBF9QBZrDNI'
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  util.setTimes(ids[0], util.mapToText($, 'td:last-child span'))

  return ids
}
exports.ids = ids
