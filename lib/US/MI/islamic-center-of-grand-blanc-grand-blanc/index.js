const util = require('../../../util')

const ids = [
  {
    uuid4: 'f2127c83-683f-4f54-a0da-367c42ce7740',
    name: 'Islamic Center of Grand Blanc',
    url: 'https://www.gbic.us/',
    timeZoneId: 'America/Detroit',
    address: '1479 E Baldwin Rd, Grand Blanc, MI 48439, USA',
    placeId: 'ChIJT3Y3pn58I4gRriDSkfUQNp4',
    geo: {
      latitude: 42.887021,
      longitude: -83.67240509999999
    }
  }
]

exports.run = async () => {
  const data = await util.loadJson('https://www.masjidnow.com/api/v2/salah_timings/daily.json?masjid_id=2884')

  if (data.masjid.date === util.strftime('%Y-%m-%d', ids[0])) {
    util.setIqamaTimes(ids[0], [
      data.masjid.salah_timing.fajr,
      data.masjid.salah_timing.dhuhr,
      data.masjid.salah_timing.asr,
      data.masjid.salah_timing.maghrib,
      data.masjid.salah_timing.isha
    ])
  } else {
    util.setIqamaTimes(ids[0], [
      '-',
      '-',
      '-',
      '-',
      '-'
    ])
  }
  util.setJumaTimes(ids[0], ['check website'])

  return ids
}

exports.ids = ids
