
const util = require('../../../util')

const ids = [
  {
    uuid4: 'b94dd720-c2da-4261-8086-ee141fb49f05',
    name: 'Masjid Al-Baqi (Muslims On Long Island Inc)',
    url: 'http://www.masjidalbaqi.org/',
    timeZoneId: 'America/New_York',
    address: '320 Central Ave, Bethpage, NY 11714, USA',
    placeId: 'ChIJvVJ6nBaAwokRk13sHZePyEQ',
    geo: {
      latitude: 40.7388553,
      longitude: -73.4823182
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.dptTimetable td:last-child')
  a.splice(1, 1) // remove sunrise
  const j = util.mapToText($, '.elementor-row > div:nth-child(2)')
    .filter(t => t.match(/\d{1,2}:\d{1,2}\s+(a|p)m/i))

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
