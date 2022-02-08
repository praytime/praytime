const util = require('../../../util')

const ids = [
  {
    uuid4: '90dc4459-9d89-4693-97de-bb7eb672df30',
    name: 'Altoona Masjid (Islamic Society of Northern Wisconsin (ISNW))',
    url: 'http://altoonamasjid.com/contact-us/',
    timeZoneId: 'America/Chicago',
    address: '527 2nd St W, Altoona, WI 54720, USA',
    placeId: 'ChIJO12jg4K7-IcRobR6JyQZcLo',
    geo: {
      latitude: 44.8038729,
      longitude: -91.43615989999999
    }
  }
]

exports.run = async () => {
  const data = await util.loadJson('https://masjidal.com/api/v1/time?masjid_id=OMA5JNdr')

  if (data.status === 'success') {
    const iqama = data.data.iqama
    util.setTimes(ids[0], [
      iqama.fajr,
      iqama.zuhr,
      iqama.asr,
      iqama.maghrib,
      iqama.isha,
      iqama.jummah1
    ])
  }
  return ids
}

exports.ids = ids
