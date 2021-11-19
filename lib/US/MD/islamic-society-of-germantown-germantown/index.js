
const util = require('../../../util')

const ids = [
  {
    uuid4: 'fe8ded7a-a8bf-4ee3-9e80-3f85998b5684',
    name: 'Islamic Society of Germantown',
    url: 'http://www.isgtown.org/',
    timeZoneId: 'America/New_York',
    address: '19825 Blunt Rd, Germantown, MD 20876, USA',
    placeId: 'ChIJB0mhQIkstokRK6EqRZDG6xk',
    geo: {
      latitude: 39.18115899999999,
      longitude: -77.235929
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, 'h5:contains("Iqama at ISG") ~ div')
    .filter(t => t.match(/\d+\s*:\s*\d+\s*(am|pm)/i))
    .map(t => t.match(/\d+\s*:\s*\d+\s*(am|pm)/i).shift())
  a.splice(3, 0, '-') // reset maghrib

  const j = util.mapToText($, 'div[data-content-shortcode*="jumuah-time"]')

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
