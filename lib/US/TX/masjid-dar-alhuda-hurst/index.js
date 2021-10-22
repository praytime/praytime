const util = require('../../../util')

const ids = [
  {
    uuid4: '938cdc2c-ad12-47e7-ab8f-555720b4101d',
    name: 'Masjid Dar Alhuda',
    url: 'http://www.masjiddaralhuda.com/',
    timeZoneId: 'America/Chicago',
    address: '1245 Karla Dr, Hurst, TX 76053, USA',
    geo: {
      latitude: 32.833157,
      longitude: -97.178208
    },
    placeId: 'ChIJC1hNWyt_ToYRAZM_rWwLe6w'
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, 'table.dptTimetable th.prayerName ~ td:last-child')
  a.splice(1, 1) // remove sunrise
  util.setIqamaTimes(ids[0], a)

  ids[0].juma1 = 'check website'

  return ids
}
exports.ids = ids
