
const util = require('../../../util')

const ids = [
  {
    uuid4: 'd4606910-20de-4091-bc6f-f7db58bf25dc',
    name: 'El-Zahra Islamic Center',
    url: 'http://www.elzahra.org/?page_id=343',
    timeZoneId: 'America/New_York',
    address: '218 Irving St, Midland Park, NJ 07432, USA',
    placeId: 'ChIJK8a8W2zjwokR6Nz1aOHxsjg',
    geo: {
      latitude: 41.001212,
      longitude: -74.14363349999999
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.widget-sidebar td:last-child')
    .slice(1)
  const j = util.mapToText($, '.widget-sidebar .textwidget p:contains("Jummah")')
    .map(t => t.split(/\r?\n/)).shift()
    .map(t => t.trim())

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
