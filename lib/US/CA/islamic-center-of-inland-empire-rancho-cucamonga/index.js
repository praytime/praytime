
const util = require('../../../util')

const ids = [
  {
    uuid4: '1aa07691-566c-4881-a076-b81dc9e7866e',
    name: 'Islamic Center of Inland Empire',
    url: 'http://www.ranchomasjid.org/',
    timeZoneId: 'America/Los_Angeles',
    address: '9212 Base Line Rd, Rancho Cucamonga, CA 91701, USA',
    placeId: 'ChIJR7Ucy4w2w4AR70F_YmGboAs',
    geo: {
      latitude: 34.1231908,
      longitude: -117.6041025
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, 'span.fusion-button-text')
    .filter(util.matchTimeAmPm)
    .map(util.extractTimeAmPm)
  a.splice(3, 0, '-') // add maghrib

  util.setTimes(ids[0], a)

  return ids
}

exports.ids = ids
