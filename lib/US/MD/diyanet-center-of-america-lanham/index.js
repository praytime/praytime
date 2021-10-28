
const util = require('../../../util')

const ids = [
  {
    uuid4: '022fab18-a1db-4f5c-a59f-5a5fb2d21040',
    name: 'Diyanet Center of America',
    url: 'https://diyanetamerica.org/services/religious-services/prayer-times/',
    timeZoneId: 'America/New_York',
    address: '9610 Good Luck Rd, Lanham, MD 20706, USA',
    placeId: 'ChIJESDuZsLBt4kR2QX9OAUp6vQ',
    geo: {
      latitude: 38.9831972,
      longitude: -76.8441794
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, 'table.vakit-table tr:last-child td')

  util.setIqamaTimes(ids[0], [a[2], a[5], a[7], a[9], a[11]])
  util.setJumaTimes(ids[0], ['check website'])

  return ids
}

exports.ids = ids
