
const util = require('../../../util')

const ids = [
  {
    uuid4: 'bd0a9214-ddf6-41ba-9bdb-49401752a59b',
    name: 'Davenport Muslim Prayer',
    url: 'https://davenportprayer.com/',
    timeZoneId: 'America/New_York',
    address: '1624 Florida Development Rd, Davenport, FL 33837, USA',
    placeId: 'ChIJv06YZIVx3YgRk7ncT2DaVQ4',
    geo: {
      latitude: 28.18719789999999,
      longitude: -81.63003030000002
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  util.setTimes(ids[0], util.mapToText($, '.jamah'))

  return ids
}

exports.ids = ids
