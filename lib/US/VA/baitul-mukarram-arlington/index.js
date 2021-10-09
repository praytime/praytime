const util = require('../../../util')

const ids = [
  {
    uuid4: '71724b9a-5d03-4038-bdbb-77bb611cfc2f',
    name: 'Baitul Mukarram',
    url: 'http://bicarlington.org/',
    address: '5410, 2116 S Nelson St, Arlington, VA 22204, USA',
    placeId: 'ChIJC8XOXU2xt4kR_VeYRbxRn-Q',
    timeZoneId: 'America/New_York',
    geo: {
      latitude: 38.849596,
      longitude: -77.090572
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  util.setTimes(ids[0], util.mapToText($, 'table.MPtimetable td:last-child').slice(1))

  return ids
}
exports.ids = ids
