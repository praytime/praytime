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
  }, {
    uuid4: '11234b6b-a67f-4b90-b790-82d9bce9ae63',
    name: 'Islamic Society of Boston (ISB Cambridge)',
    url: 'http://www.isbcc.org/',
    timeZoneId: 'America/New_York',
    address: '204 Prospect St, Cambridge, MA 02139, USA',
    placeId: 'ChIJ8y0XCk1344kRrFcIWlrZXhU',
    geo: {
      latitude: 42.3702702,
      longitude: -71.1000471
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)
  // sample: ['5:46 am | 6:05 am', '12:30 pm | 12:40 pm', '3:28 pm | 3:45 pm', '5:56 pm | 6:01 pm', '7:13 pm | 7:30 pm', 'Khutbah', '1:00 pm', '5:46 am | 6:05 am', '12:30 pm | 12:40 pm', '3:28 pm | 3:45 pm', '5:56 pm | 6:01 pm', '7:13 pm | 7:30 pm', 'Khutbah', '1:00 pm']
  const a = util.mapToText($, 'div.isbcc_prayer_times td:not(.adhan)').map((t) => t.split(' | ').pop())
  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], [a[6]])
  util.setIqamaTimes(ids[1], a)
  util.setJumaTimes(ids[1], [a[6]])
  return ids
}

exports.ids = ids
