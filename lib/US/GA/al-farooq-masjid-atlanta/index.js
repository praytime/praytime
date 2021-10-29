
const util = require('../../../util')

const ids = [
  {
    uuid4: '003db6a8-9c1b-4aed-b2f1-49b07e52dbe2',
    name: 'Al-Farooq Masjid',
    url: 'http://alfarooqmasjid.org/',
    timeZoneId: 'America/New_York',
    address: '442 14th St NW, Atlanta, GA 30318, USA',
    placeId: 'ChIJGZ7S8PME9YgRIf2DqOPfFxs',
    geo: {
      latitude: 33.7858232,
      longitude: -84.4015484
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, 'section#prayerSchedule td:last-child')

  util.setIqamaTimes(ids[0], a)

  util.setJumaTimes(ids[0], ['check website', 'check website'])

  return ids
}

exports.ids = ids
