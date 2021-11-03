
const util = require('../../../util')

const ids = [
  {
    uuid4: 'd3966e51-ebda-4ff2-83ce-dba5f9f8cae1',
    name: 'Maryam Islamic Center',
    url: 'https://www.maryammasjid.org',
    timeZoneId: 'America/Chicago',
    address: '504 Sartartia Rd, Sugar Land, TX 77479, USA',
    placeId: 'ChIJ33hIXXThQIYRZG1rSp776vU',
    geo: {
      latitude: 29.594437,
      longitude: -95.68400000000001
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.wpb_wrapper td:last-child').filter((t) => !t.match(/(salah|iqamah)/i))

  util.setTimes(ids[0], a)

  return ids
}

exports.ids = ids
