
const util = require('../../../util')

const ids = [
  {
    uuid4: '2b25b2e4-44f0-462a-b1ec-12e5bb61f650',
    name: 'Masjid Tawheed',
    url: 'http://www.masjidtawheedlv.com/',
    timeZoneId: 'America/Los_Angeles',
    address: '6180 W Viking Rd, Las Vegas, NV 89103, USA',
    placeId: 'ChIJ01tDA9vGyIARxRJ-JTwJjTw',
    geo: {
      latitude: 36.1184498,
      longitude: -115.2268276
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.textwidget td:last-child')
    .slice(1) // remove header

  util.setTimes(ids[0], a)

  return ids
}

exports.ids = ids
