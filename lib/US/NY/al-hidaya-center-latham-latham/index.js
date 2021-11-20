
const util = require('../../../util')

const ids = [
  {
    uuid4: '36487615-29b9-40ec-b2b3-0a8cb64d35c0',
    name: 'Al-Hidaya Center Latham',
    url: 'http://www.al-hidaya.org/',
    timeZoneId: 'America/New_York',
    address: '322 Troy Schenectady Rd, Latham, NY 12110, USA',
    placeId: 'ChIJo_XWj9UN3okRnB_UDKwGt0U',
    geo: {
      latitude: 42.74223629999999,
      longitude: -73.7484829
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, 'h3')
    .filter(util.matchTimeAmPm)
    .map(t => util.matchTimeAmPm(t).shift())

  a.splice(3, 0, '-') // add maghrib back in

  util.setTimes(ids[0], a)

  return ids
}

exports.ids = ids
