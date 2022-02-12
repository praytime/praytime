const util = require('../../../util')

const ids = [
  {
    uuid4: '0cfeff2c-9bc4-4065-b47b-3ee2eac3d96c',
    name: 'Islamic Center Of Midland',
    url: 'http://islamiccentermidland.org/',
    timeZoneId: 'America/Detroit',
    address: '1801 N Stark Rd, Midland, MI 48642, USA',
    placeId: 'ChIJc1JsomGAIYgRhs5PV7QKEcc',
    geo: {
      latitude: 43.66543370000001,
      longitude: -84.31070539999999
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, 'h3', $('h2:contains("Iqama")').closest('div'))
    .map(util.extractTimeAmPm)
  const j = util.mapToText($, 'h3:contains("Khutba")')
    .map(util.extractTimeAmPm)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
