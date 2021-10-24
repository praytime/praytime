const util = require('../../../util')

const ids = [
  {
    uuid4: '11cadab6-e2bb-47d7-865f-4c069007de55',
    name: 'Ribāt Institute',
    url: 'https://ribat.org/',
    timeZoneId: 'America/Chicago',
    address: '318 S Westmore Ave, Lombard, IL 60148, USA',
    placeId: 'ChIJX5BkzSNNDogRI8zyH1eFQ-0',
    geo: {
      latitude: 41.88148090000001,
      longitude: -87.99386160000002
    }
  }
]

// exports.run = async () => {
//   const $ = await util.load(ids[0].url)

//   const a = util.mapToText($, 'div#prayer-times div.prayer-row > div:last-child')
//   const j = a[a.length - 1].match(/\d+\s*:\s*\d+\s*\w+/g)

//   util.setIqamaTimes(ids[0], a)
//   util.setJumaTimes(ids[0], j)

//   return ids
// }
exports.ids = ids
