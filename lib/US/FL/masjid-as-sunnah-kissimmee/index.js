const util = require('../../../util')

const ids = [
  {
    uuid4: '793712cf-6420-4cb8-abb4-7b4764584cc3',
    name: 'Masjid As-Sunnah',
    url: 'http://masjidassunnah-fl.com/',
    timeZoneId: 'America/New_York',
    address: '1535 S Hoagland Blvd, Kissimmee, FL 34746, USA',
    placeId: 'ChIJG4EAhHiD3YgRdisxBsQ6NJY',
    geo: {
      latitude: 28.2639802,
      longitude: -81.4357186
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, 'h4 + table td:last-child')
    .slice(1) // remove header

  util.setTimes(ids[0], a)

  return ids
}

exports.ids = ids
