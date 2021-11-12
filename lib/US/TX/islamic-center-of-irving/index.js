const util = require('../../../util')
const tz = require('timezone')
const us = tz(require('timezone/America'))

const ids = [
  {
    uuid4: '6948d2fc-99ae-4bfa-a459-a2db0dd43802',
    name: 'Islamic Center of Irving',
    url: 'https://irvingmasjid.org/',
    timeZoneId: 'America/Chicago',
    address: '2555 Esters Rd, Irving, TX 75062, USA',
    geo: {
      latitude: 32.843397,
      longitude: -97.010652
    },
    placeId: 'ChIJfegQy4aBToYRcINprM4zk7M'
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)
  // %u: the weekday, Monday as the first day of the week (1-7)
  const day = us(Date.now(), ids[0].timeZoneId, '%u')

  const a = util.mapToText($, 'table.dptTimetable .jamah')
  // On Juma, zuhr is replaced
  if (day === '5') {
    a.splice(1, 0, 'Juma')
  }
  util.setIqamaTimes(ids[0], a)

  const j = util.mapToText($, 'table.dptTimetable .jumuah')
    .shift()
    .split(' | ')
    .map((t) => t.trim())
  util.setJumaTimes(ids[0], j)

  return ids
}
exports.ids = ids
