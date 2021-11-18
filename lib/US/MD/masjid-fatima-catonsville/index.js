
const util = require('../../../util')

const ids = [
  {
    uuid4: '86e32bf2-a295-4096-9d7f-45bcbfe2314f',
    name: 'Masjid Fatima',
    url: 'http://www.masjidfatima.com/',
    timeZoneId: 'America/New_York',
    address: '1928 Powers Ln, Catonsville, MD 21228, USA',
    placeId: 'ChIJd1TEvL8eyIkRt7MK7MYjTZ4',
    geo: {
      latitude: 39.285849,
      longitude: -76.75517409999999
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, 'tr:contains("Iqama") ~ tr td b')
  const j = util.mapToText($, 'tr:contains("Juma Salah")')
    .map(t => t.match(/\d+:\d+\s*\w+/).shift())

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
