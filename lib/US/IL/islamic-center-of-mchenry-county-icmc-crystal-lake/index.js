
const util = require('../../../util')

const ids = [
  {
    uuid4: '7f2f978b-8f2c-4411-aa08-a306ced4af28',
    name: 'Islamic Center of McHenry County (ICMC)',
    url: 'https://icmc-us.org/',
    timeZoneId: 'America/Chicago',
    address: '5008 E Crystal Lake Ave, Crystal Lake, IL 60014, USA',
    placeId: 'ChIJhdmHscJyD4gRMkqExptqXZg',
    geo: {
      latitude: 42.2420972,
      longitude: -88.2949917
    }
  }
]

exports.run = async () => {
  const data = await util.loadJson('https://masjidal.com/api/v1/time?masjid_id=1XAl4AbY')

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
