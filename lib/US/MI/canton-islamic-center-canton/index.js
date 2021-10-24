const util = require('../../../util')

const ids = [
  {
    uuid4: '369b7469-ff19-4661-bc86-dea167190ee3',
    name: 'Canton Islamic Center',
    url: 'http://www.cicmi.org/',
    timeZoneId: 'America/Detroit',
    address: '5840 N Canton Center Rd #218, Canton, MI 48187, USA',
    placeId: 'ChIJ02N8d59TO4gR9GzwtbbNHn0',
    geo: {
      latitude: 42.3245195,
      longitude: -83.4865786
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '[id$=Jamaat]')

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], ['check website'])

  return ids
}
exports.ids = ids
