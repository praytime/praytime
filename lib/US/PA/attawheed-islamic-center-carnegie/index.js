
const util = require('../../../util')

const ids = [
  {
    uuid4: '76667470-6e6e-4d16-9cb4-80926640d023',
    name: 'Attawheed Islamic Center',
    url: 'http://www.attawheed.org/',
    timeZoneId: 'America/New_York',
    address: '401 Washington Ave, Carnegie, PA 15106, USA',
    placeId: 'ChIJBejK-cz3NIgRN6dEpPBaUEA',
    geo: {
      latitude: 40.4093101,
      longitude: -80.0834061
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const aa = util.mapToText($, 'h2:contains("Iqamah Timings") + div td')
    .map(util.matchTimeAmPmG)
  aa[0].splice(3, 0, '-') // add maghrib back in

  util.setIqamaTimes(ids[0], aa[0])
  util.setJumaTimes(ids[0], aa[1])

  return ids
}

exports.ids = ids
