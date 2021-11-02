const util = require('../../../util')

const ids = [
  {
    uuid4: 'aa3e7e64-947c-4943-b4fc-6e5bf39b50fb',
    name: 'Central Illinois Mosque and Islamic Center',
    url: 'http://www.cimic.org',
    address: '106 S Lincoln Ave, Urbana, IL 61801, USA',
    placeId: 'ChIJZxhDOm3XDIgRwO5K4Cbi840',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 40.111639,
      longitude: -88.218979
    }
  }
]

exports.run = async () => {
  const $ = await util.load('https://us.mohid.co/il/school/cimic/masjid/widget/api/index/?m=prayertimings')

  const a = util.mapToText($, '#daily .prayer_iqama_div')
  a.splice(0, 1) // remove header
  const j = util.mapToText($, '#jummah li')
    .filter((l) => l.match(/khateeb/i))
    .map((l) => l.match(/\d+\s*:\s*\d+/g)[0])

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}
exports.ids = ids
