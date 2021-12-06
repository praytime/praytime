const util = require('../../../util')

const ids = [
  {
    uuid4: '70ca0fb6-989a-4253-bb41-5285d40a583e',
    name: 'Islamic Center of Flint',
    url: 'http://www.flintislamiccenter.com/',
    timeZoneId: 'America/Detroit',
    address: '9447 Corunna Rd, Swartz Creek, MI 48473, USA',
    placeId: 'ChIJ69IRSe11I4gR1TQY6g_rse0',
    geo: {
      latitude: 42.9994444,
      longitude: -83.86749999999999
    }
  }
]

exports.run = async () => {
  const data = await util.loadJson('https://masjidal.com/api/v1/time?masjid_id=E5Avv2AX')

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
