
const util = require('../../../util')

const ids = [
  {
    uuid4: 'e807ade1-5329-4d16-9759-5139b604dbeb',
    name: 'Hillside Islamic Center (HIC-NY)',
    url: 'https://www.hicny.org/',
    timeZoneId: 'America/New_York',
    address: '300 Hillside Avenue, New Hyde Park, NY 11040, USA',
    placeId: 'ChIJOVJRmYliwokRfs8KEnOoSk4',
    geo: {
      latitude: 40.7399212,
      longitude: -73.6981593
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.cl-prayer-box p:last-child')
    .map((t) => t.match(/\d+\s*:\s*\d+/g).pop())
  a.splice(1, 1) // remove sunrise

  const j = util.mapToText($, '.prayer_table td:nth-child(2)')

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
