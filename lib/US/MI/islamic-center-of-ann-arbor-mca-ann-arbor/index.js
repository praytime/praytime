const util = require('../../../util')
const tz = require('timezone')
const us = tz(require('timezone/America'))

const ids = [
  {
    uuid4: 'dd1bc539-cafe-4f39-b21d-f2a51e9040e7',
    name: 'Islamic Center of Ann Arbor (MCA)',
    url: 'http://mca-a2.org/',
    timeZoneId: 'America/Detroit',
    address: '2301 Plymouth Rd, Ann Arbor, MI 48105, USA',
    placeId: 'ChIJoTX09ymsPIgRO8InMPpKP-4',
    geo: {
      latitude: 42.3011923,
      longitude: -83.714602
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)
  // %u: the weekday, Monday as the first day of the week (1-7)
  const day = us(Date.now(), ids[0].timeZoneId, '%u')

  const a = util.mapToText($, 'table.dptTimetable td.jamah')
  util.setIqamaTimes(ids[0], a)

  if (day === '5') {
    // TODO: 4th Juma
    util.setJumaTimes(ids[0], util.mapToText($, '.jumuah').map((t) => t.match(/\d+\s*:\s*\d+\s*\w+/g)).pop())
  } else {
    util.setJumaTimes(ids[0], a[5].match(/\d+\s*:\s*\d+/g))
  }

  return ids
}

exports.ids = ids
