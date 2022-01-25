
const util = require('../../../util')

const ids = [
  {
    uuid4: '84725962-35c5-485f-bea3-37db288dd9a4',
    name: 'Masjid Al-Rribat Al-Islami',
    url: 'http://www.masjidribat.com/',
    timeZoneId: 'America/Los_Angeles',
    address: '7173 Saranac St, San Diego, CA 92115, USA',
    placeId: 'ChIJoRtyneVW2YARBrgiFD_SoY0',
    geo: {
      latitude: 32.7707151,
      longitude: -117.0432437
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = ['Fajr', 'Duhr', 'Asr', 'Maghrib', 'Isha', 'Jumua']
    .map(prayer => util.toText($, `.cb-heading:contains("${prayer}") + p`))

  util.setTimes(ids[0], a)

  return ids
}

exports.ids = ids
