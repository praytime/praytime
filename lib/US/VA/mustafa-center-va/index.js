const util = require('../../../util')

const ids = [
  {
    uuid4: '8e294bc2-57f9-4b3a-b20e-6ade87654241',
    name: 'Mustafa Center',
    url: 'http://www.mustafacenter.org/',
    address: '6844 Braddock Rd, Annandale, VA 22003, USA',
    timeZoneId: 'America/New_York',
    placeId: 'ChIJufAZgdCyt4kRRs3ejdgPBDQ',
    geo: {
      latitude: 38.812529,
      longitude: -77.183281
    }
  }
]

exports.run = async () => {
  const $ = await util.load('https://themasjidapp.net/7772/prayers')

  const a = util.mapToText($, 'tbody td:last-child')

  a.splice(1, 1) // remove sunrise
  a[3] = 'sunset' // maghrib

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], a.slice(5).map((e) => e.match(/\d+\s*:\s*\d+\s*\w+/)[0]))

  return ids
}
exports.ids = ids
