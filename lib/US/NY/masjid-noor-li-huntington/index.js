
const util = require('../../../util')

const ids = [
  {
    uuid4: 'b763f453-2981-4a82-b257-8b13398c0009',
    name: 'Masjid Noor LI',
    url: 'http://www.masjidnoorli.org/',
    timeZoneId: 'America/New_York',
    address: '1032 Park Ave, Huntington, NY 11743, USA',
    placeId: 'ChIJB2BjazQv6IkRqt50P8s6XTU',
    geo: {
      latitude: 40.8393664,
      longitude: -73.3664711
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, 'td:last-child')
    .filter(util.matchTimeAmPm)
  a.splice(1, 1) // remove sunrise
  a.splice(3, 0, '-') // add maghrib back in

  util.setTimes(ids[0], a)

  return ids
}

exports.ids = ids
