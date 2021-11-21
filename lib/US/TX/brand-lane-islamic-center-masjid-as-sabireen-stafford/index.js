
const util = require('../../../util')

const ids = [
  {
    uuid4: 'dc368748-708c-4a01-958f-448d8e5fe68c',
    name: 'Brand Lane Islamic Center - Masjid As Sabireen',
    url: 'http://brandlaneic.com/',
    timeZoneId: 'America/Chicago',
    address: '610 Brand Ln, Stafford, TX 77477, USA',
    placeId: 'ChIJi7aAkzbmQIYRRkho4HnM8N0',
    geo: {
      latitude: 29.6188321,
      longitude: -95.5791382
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.execphpwidget td:last-child')
    .filter(util.matchTimeAmPm)
  a.splice(3, 0, '-') // add maghrib back in

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], a
    .filter(t => t.match(/Khutbah/))
    .map(util.extractTimeAmPm))

  return ids
}

exports.ids = ids
