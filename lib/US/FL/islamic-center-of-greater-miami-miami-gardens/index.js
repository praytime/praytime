
const util = require('../../../util')

const ids = [
  {
    uuid4: '4309d979-d730-4a9e-a12e-316a0f6218da',
    name: 'Islamic Center of Greater Miami',
    url: 'https://miamimuslim.org/',
    timeZoneId: 'America/New_York',
    address: '4305 NW 183rd St, Miami Gardens, FL 33055, USA',
    placeId: 'ChIJXzKFYoav2YgREiNAZ9Ly22M',
    geo: {
      latitude: 25.9407944,
      longitude: -80.2718556
    }
  },
  {
    uuid4: '23932380-e633-4c90-a41d-6218f72be2cf',
    name: 'Miami Masjid',
    url: 'https://miamimuslim.org/',
    timeZoneId: 'America/New_York',
    address: '7350 NW 3rd St, Miami, FL 33126, USA',
    placeId: 'ChIJLzBk26652YgRoq6Ojwn5pFo',
    geo: {
      latitude: 25.7734119,
      longitude: -80.3147256
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const prayerTimeTables = $('.prayer_time_1')
  util.setTimes(ids[0], $('td:last-child', prayerTimeTables.eq(0))
    .map((_, v) => $(v).text().trim())
    .toArray()
    .filter((t) => t.match(/(\d+:\d+|sunset)/i)))
  util.setTimes(ids[1], $('td:last-child', prayerTimeTables.eq(1))
    .map((_, v) => $(v).text().trim())
    .toArray()
    .filter((t) => t.match(/(\d+:\d+|sunset)/i)))

  return ids
}

exports.ids = ids
