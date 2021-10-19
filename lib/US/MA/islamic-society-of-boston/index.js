const util = require('../../../util')

const ids = [
  {
    uuid4: 'b15c2330-a519-40cb-b459-cc5c1c40ba63',
    name: 'Islamic Society of Boston',
    url: 'https://isbcc.org/',
    timeZoneId: 'America/New_York',
    address: '100 Malcolm X Blvd, Roxbury, MA 02120, USA',
    geo: {
      latitude: 42.330767,
      longitude: -71.093331
    },
    placeId: 'ChIJxaE1OCZ644kRVUl5tYIcXLQ'
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)
  // sample: ['5:46 am | 6:05 am', '12:30 pm | 12:40 pm', '3:28 pm | 3:45 pm', '5:56 pm | 6:01 pm', '7:13 pm | 7:30 pm', 'Khutbah', '1:00 pm', '5:46 am | 6:05 am', '12:30 pm | 12:40 pm', '3:28 pm | 3:45 pm', '5:56 pm | 6:01 pm', '7:13 pm | 7:30 pm', 'Khutbah', '1:00 pm']
  const a = util.mapToText($, 'div.isbcc_prayer_times td:not(.adhan)').map((t) => t.split(' | ').reverse()[0])
  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], [a[6]])
  return ids
}

exports.ids = ids
