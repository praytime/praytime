const util = require('../../../util')

const ids = [
  {
    uuid4: '240d4861-684c-4bbe-88cb-d7b55c8520bf',
    name: 'Erie Masjid',
    url: 'https://eriemasjid.alminaret.com/',
    timeZoneId: 'America/New_York',
    address: '2419 Holland St, Erie, PA 16503, USA',
    placeId: 'ChIJdyZT9iOAMogRJsBx9e43Y_w',
    geo: {
      latitude: 42.1147876,
      longitude: -80.0703987
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.athan-time strong:last-child')
  const j = util.mapToText($, '.jumuah-name')
    .map(util.extractTimeAmPm)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
