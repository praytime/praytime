const util = require('../../../util')

const ids = [
  {
    uuid4: 'e1fb1633-e0aa-4e61-911a-8e7aa600ebd4',
    name: 'Masjid Bilal Canton',
    url: 'https://www.masjidbilalcanton.org/',
    timeZoneId: 'America/Detroit',
    address: '1525 Ridge Rd N, Canton, MI 48187, USA',
    placeId: 'ChIJXYr6aUJUO4gR-fYI3dMvjPQ',
    geo: {
      latitude: 42.31654,
      longitude: -83.530075
    }
  }
]

exports.run = async () => {
  const $ = await util.load('https://assalam.info/widget/MBC/1/0')

  const a = util.mapToText($, 'td:last-child').filter((t) => t.match(/\d{1,2}\s*:\s*\d{1,2}/))
  a.splice(1, 1) // remove sunrise
  const j = a[5].match(/\d+\s*:\s*\d+\s*\w+/g)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}
exports.ids = ids
