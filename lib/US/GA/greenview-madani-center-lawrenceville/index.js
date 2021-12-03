
const util = require('../../../util')

const ids = [
  {
    uuid4: '4517f1dd-493b-44d1-9053-79d99d7cf135',
    name: 'Greenview Madani Center',
    url: 'http://www.madanicenter.org/',
    timeZoneId: 'America/New_York',
    address: '3455 Greenview Dr NW, Lawrenceville, GA 30044, USA',
    placeId: 'ChIJ43rRoUaj9YgR3sTGMrxWPpM',
    geo: {
      latitude: 33.9407012,
      longitude: -84.1160416
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.textwidget span:contains("Fajr")')
    .map(util.matchTimeAmPmG).shift()
  a.splice(3, 0, '-') // add maghrib back in
  util.setIqamaTimes(ids[0], a)

  const j = util.mapToText($, '.textwidget span')
    .filter(t => t.match(/^(1st|2nd)\sJum/i))
    .map(util.extractTimeAmPm)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
