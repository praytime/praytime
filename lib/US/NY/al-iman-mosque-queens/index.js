
const util = require('../../../util')

const ids = [
  {
    uuid4: 'aeec7d94-658a-47cb-b38c-8254da8bd7b2',
    name: 'Al-Iman Mosque',
    url: 'http://aliman-mosque.alimancenter.org',
    timeZoneId: 'America/New_York',
    address: '24-30 Steinway St, Queens, NY 11103, USA',
    placeId: 'ChIJcd40bWpfwokRarqRDvYtYAM',
    geo: {
      latitude: 40.768471,
      longitude: -73.9115833
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, 'div:contains("PRAYER TIMING") + div li')
    .filter(util.matchTimeAmPm)
    .map(util.extractTimeAmPm)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], ['check website'])

  return ids
}

exports.ids = ids
