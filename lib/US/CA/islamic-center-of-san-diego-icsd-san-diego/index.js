
const util = require('../../../util')

const ids = [
  {
    uuid4: '95b4e60b-b115-492a-93ca-34cd821cbac6',
    name: 'Islamic Center of San Diego (ICSD)',
    url: 'http://www.icsd.org/',
    timeZoneId: 'America/Los_Angeles',
    address: '7050 Eckstrom Ave, San Diego, CA 92111, USA',
    placeId: 'ChIJQe8a94z_24ARQeOZ6hQr1f0',
    geo: {
      latitude: 32.8204669,
      longitude: -117.1655668
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.row > .col-12 > p').filter((t) => t.match(/\d{1,2}\s*:\s*\d{2}\s*(a|p)m/i))
  a.splice(3, 0, '-') // maghrib entry
  const j = a[a.length - 1].match(/\d+\s*:\s*\d+\s*\w+/g)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
