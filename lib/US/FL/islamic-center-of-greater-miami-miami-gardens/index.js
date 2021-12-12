
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

  const aa = util.mapToText($, 'h2 span.color_26')
    .filter(util.matchTimeAmPm)
    .map(util.matchTimeAmPmG)

  aa[0].splice(3, 0, '-') // reinsert maghrib
  util.setIqamaTimes(ids[0], aa[0])
  util.setJumaTimes(ids[0], aa[1])

  aa[2].splice(3, 0, '-') // reinsert maghrib
  util.setIqamaTimes(ids[1], aa[2])
  util.setJumaTimes(ids[1], aa[3])

  return ids
}

exports.ids = ids
