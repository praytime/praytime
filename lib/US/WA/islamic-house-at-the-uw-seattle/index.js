const util = require('../../../util')

const ids = [
  {
    uuid4: '8229b177-d40f-49c6-9106-089c2d3e633b',
    name: 'Islamic House at the UW',
    url: 'https://msauw.org/islamic-house/',
    timeZoneId: 'America/Los_Angeles',
    address: '4625 22nd Ave NE, Seattle, WA 98105, USA',
    placeId: 'ChIJVwLeFokUkFQRo2ebvW3-m8w',
    geo: {
      latitude: 47.6626257,
      longitude: -122.3046751
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.jamah')
  const j = util.mapToText($, 'h2:contains("Jummah")')
    .map(util.extractTimeAmPm)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)
  return ids
}

exports.ids = ids
