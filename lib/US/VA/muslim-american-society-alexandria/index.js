const util = require('../../../util')

const ids = [
  {
    uuid4: '9b86cead-4bae-4619-b335-180ee2a6ed78',
    name: 'Muslim American Society',
    url: 'https://masdc.org/',
    timeZoneId: 'America/New_York',
    address: '6408 Edsall Rd, Alexandria, VA 22312, USA',
    placeId: 'ChIJl2nIW_Cyt4kRQHNIy86vKnc',
    geo: {
      latitude: 38.80509,
      longitude: -77.1577497
    }
  }
]

exports.run = async () => {
  const data = await util.loadJson('https://masjidal.com/api/v1/time?masjid_id=YRKxVOAO')

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
