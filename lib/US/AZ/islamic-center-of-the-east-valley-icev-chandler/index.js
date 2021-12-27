
const util = require('../../../util')

const ids = [
  {
    uuid4: '1a593ad9-c1c7-47be-8319-f7183bc35a9e',
    name: 'Islamic Center of the East Valley (ICEV)',
    url: 'https://www.icev.org/',
    timeZoneId: 'America/Phoenix',
    address: '425 N Alma School Rd, Chandler, AZ 85224, USA',
    placeId: 'ChIJn1Q296oAK4cRuiIpXNcVZbI',
    geo: {
      latitude: 33.31097759999999,
      longitude: -111.8576199
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, 'h4 + p')
  const j = util.mapToText($, 'p:first-child:last-child')
    .filter(t => t.includes('Jumuah'))
    .map(util.matchTimeAmPmG)
    .flat()

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
