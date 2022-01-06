const util = require('../../../util')

const ids = [
  {
    uuid4: '06218b10-3f44-4217-ac3b-e98eb30461d7',
    name: 'ICN Bellevue Masjid',
    url: 'http://icnbm.org/',
    timeZoneId: 'America/Chicago',
    address: '7337 Charlotte Pike, Nashville, TN 37209, USA',
    placeId: 'ChIJrdHzzZeJZIgR54n1bWVzeFE',
    geo: {
      latitude: 36.1172624,
      longitude: -86.91980459999999
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.prayertime .prayer_table td:last-child')
  a.splice(1, 1) // remove sunrise

  const j = util.mapToText($, '.jumuatime .prayer_table td:nth-child(2)')

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
