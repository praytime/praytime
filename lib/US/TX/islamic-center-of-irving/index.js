const util = require('../../../util')

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

  const a = util.mapToText($, '.dptTimetable .tableHeading:contains("Iqamah") ~ td')
  if (util.isJumaToday(ids[0])) {
    // On Juma, zuhr is replaced
    a.splice(1, 0, 'Juma')
    util.setIqamaTimes(ids[0], a)

    const j = util.mapToText($, '.dptTimetable .tableHeading:contains("Adhan") ~ td:contains("JUMUA")')
      .map(t => t.split(' | '))
      .flat()
      .map(util.extractTimeAmPm)
    util.setJumaTimes(ids[0], j)
  } else {
    util.setJumaTimes(ids[0], util.mapToText($, '.dptTimetable .tableHeading:contains("Jumuah") ~ td')
      .shift()
      .split(' | ')
      .map(t => t.trim())
      .map(util.extractTimeAmPm))
    util.setIqamaTimes(ids[0], a)
  }

  return ids
}
exports.ids = ids
