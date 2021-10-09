const util = require('../../../util')

const ids = [
  {
    uuid4: 'e33ad2e4-6986-43c6-87ee-e566eaa906a0',
    name: 'Islamic Center of Northern Virginia',
    url: 'http://icnvt.com/',
    address: '4420 Shirley Gate Rd, Fairfax, VA 22030, USA',
    placeId: 'ChIJW9VHHAVPtokRpLC4ENiNUwQ',
    timeZoneId: 'America/New_York',
    geo: {
      latitude: 38.845966,
      longitude: -77.341281
    }
  }
]

exports.run = async () => {
  // TODO: puppeteer
  util.setTimes(ids[0], [
    'check website',
    'check website',
    'check website',
    'check website',
    'check website',
    'check website',
    'check website',
    'check website'
  ])

  return ids
}
exports.ids = ids
