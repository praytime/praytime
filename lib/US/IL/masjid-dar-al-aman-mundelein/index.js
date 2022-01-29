
const util = require('../../../util')

const ids = [
  {
    uuid4: '2bead9ce-f896-4039-ace2-7b2fe3c242b2',
    name: 'Masjid Dar Al-Aman',
    url: 'http://www.ampoonline.com/',
    timeZoneId: 'America/Chicago',
    address: '25667 Hillview Ct, Mundelein, IL 60060, USA',
    placeId: 'ChIJt3zQsouYD4gRt7JyII_rpwA',
    geo: {
      latitude: 42.2359857,
      longitude: -88.05368299999999
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, 'div > :contains("Salah") + ul li')
    .slice(0, 6)
    .map(t => t.replace(/^\s*\w+\s*/, ''))
    .map(t => t.replace(/\.+/, ''))
    .map(t => t.replace(/\s/g, ''))

  util.setTimes(ids[0], a)

  return ids
}

exports.ids = ids
