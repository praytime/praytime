
const util = require('../../../util')

const ids = [
  {
    uuid4: '8397d58c-9346-4872-b34c-f6e2c414fb04',
    name: 'Windsor Islamic Association Centre',
    url: 'https://windsorislamicassociation.com/',
    timeZoneId: 'America/Toronto',
    address: '2555 McKay Ave, Windsor, ON N9E 2P4, Canada',
    placeId: 'ChIJWxU-5TMsO4gRkrJOjkCryIU',
    geo: {
      latitude: 42.274404,
      longitude: -83.03125200000001
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.jamah')
  const j = util.mapToText($, '.textwidget p > strong')
    .filter(util.matchTimeAmPm)
    .slice(0, 1)
    .map(util.matchTimeAmPmG)
    .shift()

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
