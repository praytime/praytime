const util = require('../../../util')

const ids = [
  {
    uuid4: '0609e5cb-1db2-46d8-80d5-053a9b8bf199',
    name: 'Islamic Society of Central New York (Syracuse Mosque)',
    url: 'http://iscnyonline.com/',
    timeZoneId: 'America/New_York',
    address: '925 Comstock Ave, Syracuse, NY 13210, USA',
    placeId: 'ChIJqfekqHfz2YkRxYqvTrwbVZo',
    geo: {
      latitude: 43.0322284,
      longitude: -76.12903109999999
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.prayer-times li span:last-child').slice(1)

  util.setTimes(ids[0], a)

  return ids
}

exports.ids = ids
