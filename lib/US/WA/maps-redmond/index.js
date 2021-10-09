const util = require('../../../util')

const ids = [
  {
    uuid4: '5be0348d-06cc-49b1-923f-c8acdef8e27e',
    name: 'Muslim Association of Puget Sound',
    url: 'https://www.mapsredmond.org/',
    address: '17550 NE 67th Ct, Redmond, WA 98052, USA',
    placeId: 'ChIJ2dRVrb1ykFQR4Jt-FGpMGLA',
    timeZoneId: 'America/Los_Angeles',
    geo: {
      latitude: 47.665648,
      longitude: -122.106557
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = $('h2:contains("Prayer Timings")').parent().find('li > span:last-child').map((_, v) => $(v).text().trim()).toArray().slice(1)
  const j = util.mapToText($, 'div.jamu-sec h1').slice(0, 2)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}
exports.ids = ids
