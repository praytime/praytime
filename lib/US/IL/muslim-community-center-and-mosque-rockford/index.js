const util = require('../../../util')

const ids = [
  {
    uuid4: '77d6ef57-0796-4879-8f20-600de2cdaa90',
    name: 'Muslim Community Center \u0026 Mosque',
    url: 'https://magr.org/',
    timeZoneId: 'America/Chicago',
    address: '5921 Darlene Dr, Rockford, IL 61109, USA',
    placeId: 'ChIJ97qso6G4CIgR1LwZ4n0DFP8',
    geo: {
      latitude: 42.2360704,
      longitude: -89.00058489999999
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const pt = $('span:contains("Jamaat Prayer Times")').closest('table')

  const a = util.mapToText($, 'td:last-child', pt)
    .filter(util.matchTimeAmPm)

  a.splice(3, 0, '-') // insert maghrib

  const j = util.mapToText($, 'td:contains("Khutbah") + td', pt)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
