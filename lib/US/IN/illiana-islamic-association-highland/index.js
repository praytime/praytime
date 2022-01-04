const util = require('../../../util')

const ids = [
  {
    uuid4: 'ac228046-60ee-49d8-b290-355560944866',
    name: 'Illiana Islamic Association',
    url: 'http://www.highlandmasjid.org/',
    timeZoneId: 'America/Chicago',
    address: '9608 Spring St, Highland, IN 46322, USA',
    placeId: 'ChIJK1r4s9DgEYgR4kaFSlvpQ3Q',
    geo: {
      latitude: 41.5387837,
      longitude: -87.4693341
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.jamah')
  const j = a.slice(-1).map(util.matchTimeG).shift()

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)
  return ids
}

exports.ids = ids
