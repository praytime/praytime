
const util = require('../../../util')

const ids = [
  {
    uuid4: '226261ab-ace0-41a6-91c2-70f6868017c9',
    name: 'Islamic Center of Northeast Florida',
    url: 'https://icnef.org/',
    timeZoneId: 'America/New_York',
    address: '2333 St Johns Bluff Rd S, Jacksonville, FL 32246, USA',
    placeId: 'ChIJqfs5YtC05YgRVHFqhOod5C0',
    geo: {
      latitude: 30.3076795,
      longitude: -81.52508929999999
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  $('.prayer-times li.pry-tim-hed').remove()

  const a = util.mapToText($, '.prayer-times li > span:last-child')

  util.setTimes(ids[0], a)

  return ids
}

exports.ids = ids
