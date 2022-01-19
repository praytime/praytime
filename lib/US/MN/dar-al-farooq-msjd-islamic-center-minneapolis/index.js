const util = require('../../../util')

const ids = [
  {
    uuid4: '1dc837b2-a136-4934-be31-00b20e36bea6',
    name: 'Dar Al-Farooq مسجد Islamic Center',
    url: 'https://www.daralfarooq.com/',
    timeZoneId: 'America/Chicago',
    address: '8201 Park Ave S, Minneapolis, MN 55420, USA',
    placeId: 'ChIJ-10ruY4l9ocR2fKIf53F9gY',
    geo: {
      latitude: 44.85538949999999,
      longitude: -93.26484719999999
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.prayer-time')
  const j = a.slice(-1).map(util.matchTimeG).shift()

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)
  return ids
}

exports.ids = ids
