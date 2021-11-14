
const util = require('../../../util')

const ids = [
  {
    uuid4: 'f4f1d6f6-8f60-435a-97ba-35bec83e09a0',
    name: 'Tawheed Center',
    url: 'http://tawheedcenter.org/',
    timeZoneId: 'America/Detroit',
    address: '29707 W 10 Mile Rd, Farmington, MI 48336, USA',
    placeId: 'ChIJW4L6DiyxJIgRMYh0hvAdQiA',
    geo: {
      latitude: 42.469918,
      longitude: -83.340744
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