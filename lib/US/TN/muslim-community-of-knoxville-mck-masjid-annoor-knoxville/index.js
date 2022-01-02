
const util = require('../../../util')

const ids = [
  {
    uuid4: '9dcf7c55-4a6d-4b55-b501-2afdd68df38c',
    name: 'Muslim Community of Knoxville (MCK)—Masjid Annoor',
    url: 'http://muslimknoxville.org/',
    timeZoneId: 'America/New_York',
    address: '100 13th St, Knoxville, TN 37916, USA',
    placeId: 'ChIJ23sAL9kXXIgRKEkMX_nkyCw',
    geo: {
      latitude: 35.9638006,
      longitude: -83.92909809999999
    }
  }
]

exports.run = async () => {
  const $ = await util.load('https://muslimknoxville.org/services/prayers-and-jumuah/')

  const a = util.mapToText($, '.dpt_jamah')
  const j = util.mapToText($, '.elementor-icon-list-text:contains("Khut")')
    .map(util.extractTimeAmPm)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
