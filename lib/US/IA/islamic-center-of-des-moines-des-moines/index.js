
const util = require('../../../util')

const ids = [
  {
    uuid4: '3d6a2324-4344-4c65-8ef5-70dc8ff17ea2',
    name: 'Islamic Center of Des Moines',
    url: 'http://www.islamiccenterdm.com/',
    timeZoneId: 'America/Chicago',
    address: '6201 Franklin Ave, Des Moines, IA 50322, USA',
    placeId: 'ChIJJxpAVH2e7ocR8opj1FbF_TY',
    geo: {
      latitude: 41.61157319999999,
      longitude: -93.70284029999999
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, 'table:last-child td:last-child').slice(1)
  // select div that don't have descendant div and contain "Khutba"
  const j = util.mapToText($, 'div:not(:has(div)):contains("Khutba")')
    .map(util.matchTimeAmPmG)
    .flat()

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
