
const util = require('../../../util')

const ids = [
  {
    uuid4: '4c1c8d32-3dfb-459d-a062-3538af88e5f8',
    name: 'ISGH Masjid Hamza - Mission Bend Islamic Center',
    url: 'http://www.isghmasjidhamza.com/',
    timeZoneId: 'America/Chicago',
    address: '6233 Tres Lagunas Dr, Houston, TX 77083, USA',
    placeId: 'ChIJ-TJp29PdQIYRNdzKNKoBtrE',
    geo: {
      latitude: 29.71004109999999,
      longitude: -95.6380552
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, 'div#mf2_second > div').filter((t) => t.match(/\d{1,2}\s*:\s*\d{1,2}/))[0].match(/\d{1,2}\s*:\s*\d{1,2}\s*\w+/g)
  a.splice(3, 0, '-') // add maghrib

  util.setTimes(ids[0], a)

  return ids
}

exports.ids = ids
