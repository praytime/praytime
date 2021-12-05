
const util = require('../../../util')

const ids = [
  {
    uuid4: 'c289251e-79b5-429d-b79a-60e86d6083a3',
    name: 'The Muslim Unity Center',
    url: 'http://www.muslimunitycenter.org/',
    timeZoneId: 'America/Detroit',
    address: '1830 W Square Lake Rd, Bloomfield Twp, MI 48302, USA',
    placeId: 'ChIJc3ClsLi-JIgRLNB0Yvt39-0',
    geo: {
      latitude: 42.60524969999999,
      longitude: -83.3157209
    }
  }
]

exports.run = async () => {
  const $ = await util.load('https://themasjidapp.net/masjids/muc/prayers')

  const a = util.mapToText($, 'tbody td:last-child')
    .filter(util.matchTimeAmPm)
    .map(util.extractTimeAmPm)

  a.splice(1, 1) // remove sunrise

  util.setTimes(ids[0], a)

  return ids
}

exports.ids = ids
