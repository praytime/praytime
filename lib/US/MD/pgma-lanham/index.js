const util = require('../../../util')

const ids = [
  {
    uuid4: 'a5c8e3f5-25fe-46d6-813c-e86f8002a7a6',
    name: "Prince George's Muslim Association",
    url: 'http://pgmamd.org',
    address: '9150 Lanham Severn Rd, Lanham, MD 20706, USA',
    placeId: 'ChIJu9mKv73Bt4kRu9BSvbTPfDU',
    timeZoneId: 'America/New_York',
    geo: {
      latitude: 38.967486,
      longitude: -76.856091
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, 'div#prayer-times div.prayer-row > div:last-child')
  const j = a[a.length - 1].match(/\d+\s*:\s*\d+\s*\w+/g)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}
exports.ids = ids
