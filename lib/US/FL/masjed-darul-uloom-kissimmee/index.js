const util = require('../../../util')

const ids = [
  {
    uuid4: '5e6c37fd-58df-4597-9e49-40d0c094d82f',
    name: 'Masjed Darul uloom',
    url: 'http://www.darululoomflorida.org/',
    timeZoneId: 'America/New_York',
    address: '2350 Old Vineland Rd, Kissimmee, FL 34746, USA',
    placeId: 'ChIJe4oGOH2B3YgRi1NU58POD2A',
    geo: {
      latitude: 28.3138155,
      longitude: -81.4615745
    }
  }
]

exports.run = async () => {
  const $ = await util.load('http://www.darululoomflorida.org/PrayerTime/')

  const a = util.mapToText($, 'h4')
    .filter(util.matchTimeAmPm)

  util.setTimes(ids[0], a)

  return ids
}

exports.ids = ids
