const util = require('../../../util')

const ids = [
  {
    uuid4: '017bd43c-cdac-4991-a034-1fce17bda7f7',
    name: 'Islamic Center of Nashville',
    url: 'http://www.icntn.org/',
    timeZoneId: 'America/Chicago',
    address: '2515 12th Ave S, Nashville, TN 37204, USA',
    placeId: 'ChIJGT6Xti9kZIgRG21qxtnpFMA',
    geo: {
      latitude: 36.12428,
      longitude: -86.789977
    }
  }
]

exports.run = async () => {
  const data = await util.loadJson('https://masjidal.com/api/v1/time?masjid_id=pVdwPMKe')

  if (data.status === 'success') {
    const iqama = data.data.iqama
    util.setTimes(ids[0], [
      iqama.fajr,
      iqama.zuhr,
      iqama.asr,
      iqama.maghrib,
      iqama.isha,
      iqama.jummah1,
      iqama.jummah2
    ])
  }
  return ids
}

exports.ids = ids
