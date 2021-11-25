const util = require('../../../util')

const ids = [
  {
    uuid4: '65e107c8-b056-457a-a6f1-06280d6410f0',
    name: 'At-Takaful Islamic Society',
    url: 'http://icconline.org/',
    address: '5933 N Lincoln Ave, Chicago, IL 60659, USA',
    placeId: 'ChIJvbnzRRrOD4gRP2mO5m6be7E', // ChIJ9_F0fCXPD4gRT0QPjaqS_hM     Mosque
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 41.989204,
      longitude: -87.70492
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.item-qty')
  a.splice(1, 1) // remove sunrise

  const j = util.mapToText($, 'h4 > strong')
    .map(util.matchTimeAmPmG)
    .shift()

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}
exports.ids = ids
