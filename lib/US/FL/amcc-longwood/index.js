
const util = require('../../../util')

const ids = [
  {
    uuid4: '27642a3b-af3c-4cb8-87ee-6066d053b2ab',
    name: 'AMCC',
    url: 'http://www.amccenters.org/',
    timeZoneId: 'America/New_York',
    address: '811 Wilma St, Longwood, FL 32750, USA',
    placeId: 'ChIJQfGHkw1y54gRct3TzvNbPso',
    geo: {
      latitude: 28.69534800000001,
      longitude: -81.34961179999999
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.dpt_jamah')
  const j = util.mapToText($, 'h5:contains("Khutbah")')
    .map(t => t.split('\n'))
    .flat()
    .map(util.extractTimeAmPm)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
