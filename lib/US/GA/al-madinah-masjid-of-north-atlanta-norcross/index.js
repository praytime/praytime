
const util = require('../../../util')

const ids = [
  {
    uuid4: '3154a91f-911e-4923-92ca-65d9b5b0dc82',
    name: 'Al-Madinah Masjid of North Atlanta',
    url: 'http://www.almadinahatl.org/',
    timeZoneId: 'America/New_York',
    address: '6014 Goshen Springs Rd, Norcross, GA 30071, USA',
    placeId: 'ChIJTVAR2rmm9YgR99-QgWUk3Mk',
    geo: {
      latitude: 33.916002,
      longitude: -84.20537580000001
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.dptTimetable td:last-child')
  a.splice(1, 1) // remove sunrise

  if (util.isJumaToday(ids[0])) {
    a[1] = 'juma'
    const j = util.mapToText($, '.jumuah')
      .map(util.matchTimeG)
      .pop()
    util.setJumaTimes(ids[0], j)
  } else {
    util.setJumaTimes(ids[0], util.matchTimeG(a[5]))
  }

  util.setIqamaTimes(ids[0], a)

  return ids
}

exports.ids = ids
