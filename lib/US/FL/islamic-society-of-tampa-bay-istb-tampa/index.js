const util = require('../../../util')

const ids = [
  {
    uuid4: 'a24974e6-b51c-42ed-a56a-582c28715d0e',
    name: 'Islamic Society of Tampa Bay (ISTB)',
    url: 'http://www.istaba.org/',
    timeZoneId: 'America/New_York',
    address: '7326 E Sligh Ave, Tampa, FL 33610, USA',
    placeId: 'ChIJZ0g1kbvIwogRnMt_itAcecY',
    geo: {
      latitude: 28.0115311,
      longitude: -82.3740528
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToTextPreserveBreaks($, 'h1:contains("Masjid Iqamah") + p')
    .map(t => t.split('\n')
      .filter(util.matchTimeAmPm)
      .map(util.extractTimeAmPm))
    .shift()

  a.splice(3, 0, '-')

  util.setIqamaTimes(ids[0], a)

  const j = util.mapToTextPreserveBreaks($, 'h1:contains("Friday Khutba") + p')
    .map(t => t.split('\n')
      .filter(util.matchTimeAmPm)
      .map(util.extractTimeAmPm))
    .shift()

  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
