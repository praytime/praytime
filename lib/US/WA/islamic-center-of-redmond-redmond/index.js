
const util = require('../../../util')

const ids = [
  {
    uuid4: '184063c6-dac2-4c22-b215-81ca4bb58462',
    name: 'Islamic Center of Redmond',
    url: 'http://www.redmondmosque.com/',
    timeZoneId: 'America/Los_Angeles',
    address: '18080 NE 68th St, Redmond, WA 98052, USA',
    placeId: 'ChIJTUmMm79ykFQRCzjM_61h-Bg',
    geo: {
      latitude: 47.66775579999999,
      longitude: -122.0978881
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.jamah')
    .filter(t => t.length > 0)

  const j = a[5].match(util.timeAmPmRxG)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
