
const util = require('../../../util')

const ids = [
  {
    uuid4: '37cc8d40-db35-4c51-afe9-fb673ddf4b2a',
    name: 'Masjid ElFarouq',
    url: 'http://www.elfarouq.org/',
    timeZoneId: 'America/Chicago',
    address: '1207 Conrad Sauer Dr, Houston, TX 77043, USA',
    placeId: 'ChIJ4z2XmsfEQIYR6KqZFInm704',
    geo: {
      latitude: 29.7887526,
      longitude: -95.5494021
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.sc_table th')
    .filter((t) => t.match(/\d+\s*:\s*\d+/))
    .map((t) => t.match(/\d+\s*:\s*\d+/g)[0])

  a.splice(3, 0, '-')

  util.setTimes(ids[0], a)

  return ids
}

exports.ids = ids
