const util = require('../../../util')

const ids = [
  {
    uuid4: '9be8972d-dd2e-40ac-9598-6a6ce7aaaacf',
    name: 'Central Park Jame Masjid',
    url: 'http://www.centralparkmasjid.com/',
    timeZoneId: 'America/New_York',
    address: '97 Rodney Ave, Buffalo, NY 14214, USA',
    placeId: 'ChIJU5TtGi8T04kRCCxd9HE1A60',
    geo: {
      latitude: 42.93603359999999,
      longitude: -78.8386762
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, 'p:contains("Magreeb") > strong')

  util.setTimes(ids[0], a)
  return ids
}

exports.ids = ids
