
const util = require('../../../util')

const ids = [
  {
    uuid4: '8a4e4082-5f30-44ce-afbe-4067f7d72043',
    name: 'Islamic Center of Greater Austin- Masjid',
    url: 'http://austinmosque.org/',
    timeZoneId: 'America/Chicago',
    address: '5110 Manor Rd, Austin, TX 78723, USA',
    placeId: 'ChIJYTZ1Jx22RIYRg1tUYipqcyc',
    geo: {
      latitude: 30.29962,
      longitude: -97.686797
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, 'h5 ~ table td:last-child')
    .filter(util.matchTime)
    .map(util.extractTime)
  a.splice(1, 1) // remove sunrise

  util.setTimes(ids[0], a)

  return ids
}

exports.ids = ids
