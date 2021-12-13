
const util = require('../../../util')

const ids = [
  {
    uuid4: 'b96628ab-8d24-4109-ab37-ad842a3af3e1',
    name: 'Islamic Center of Polk County',
    url: 'http://www.icopc.org/',
    timeZoneId: 'America/New_York',
    address: '1763 Unity Way NW, Winter Haven, FL 33881, USA',
    placeId: 'ChIJ72yBodkS3YgRI13s3sAnqn4',
    geo: {
      latitude: 28.0399694,
      longitude: -81.73132350000002
    }
  }
]

exports.run = async () => {
  const $ = await util.load('http://www.icopc.org/prayer_times.htm')

  const a = util.mapToText($, 'tr:last-child td')
    .slice(1) // remove header

  util.setIqamaTimes(ids[0], a)

  util.setJumaTimes(ids[0], ['check website'])

  return ids
}

exports.ids = ids
