const util = require('../../../util')
const tz = require('timezone')
const us = tz(require('timezone/America'))

const results = [
  {
    uuid4: '21000984-0003-4c25-abd2-00c4e9b883d6',
    name: 'Masjid Al-Nur',
    url: 'http://masjidalnur.org/',
    timeZoneId: 'America/Los_Angeles',
    address: '4324 20th Ln NE, Olympia, WA 98516, USA',
    geo: {
      latitude: 47.063416,
      longitude: -122.828343
    },
    placeId: 'ChIJWxjFAuIKkVQRURrYHHMkuXk'
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
