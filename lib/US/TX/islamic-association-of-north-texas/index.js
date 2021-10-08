const util = require('../../../util')
const tz = require('timezone')
const us = tz(require('timezone/America'))

const results = [
  {
    uuid4: 'e4e3fa99-3df8-4e8c-8e37-5d353c2b51eb',
    name: 'Islamic Assocation of North Texas',
    url: 'https://iant.com/',
    timeZoneId: 'America/Chicago',
    address: '840 Abrams Rd, Richardson, TX 75081, USA',
    geo: {
      latitude: 32.939541,
      longitude: -96.730714
    },
    placeId: 'ChIJJ7Bj_J4fTIYRfWVohOA_w60'
  }
]

exports.run = async () => {
  const $ = await util.load(results[0].url)
  // %u: the weekday, Monday as the first day of the week (1-7)
  const day = us(Date.now(), results[0].timeZoneId, '%u')

  const a = util.mapToText($, 'table.dptTimetable td.jamah')
  util.setIqamaTimes(results[0], a)

  let j = []
  // on juma, dhuhr is replaced
  if (day === '5') {
    j = a[1].match(/\d+\s*:\s*\d+/g)
  } else {
    j = a[5].match(/\d+\s*:\s*\d+/g)
  }

  util.setJumaTimes(results[0], j)

  return results
}
