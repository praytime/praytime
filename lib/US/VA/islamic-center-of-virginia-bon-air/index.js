
const util = require('../../../util')

const ids = [
  {
    uuid4: 'fbc82150-2098-4217-930a-0f3093cdd3a3',
    name: 'Islamic Center of Virginia',
    url: 'https://icva1.com/',
    timeZoneId: 'America/New_York',
    address: '1241 Buford Rd, North Chesterfield, VA 23235, USA',
    placeId: 'ChIJrxOo384SsYkRSfw0fHaQkfI',
    geo: {
      latitude: 37.5151549,
      longitude: -77.5534873
    }
  }
]

exports.run = async () => {
  const $ = await util.load('http://petraerp.w20.wh-2.com/icva/DailyprayersOnly.aspx')

  const a = util.mapToText($, 'span[id^=Left]')
  const j = util.mapToText($, 'span[id^=L_juma i]') // case insensitive attribute selector
    .filter(util.matchTime)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
