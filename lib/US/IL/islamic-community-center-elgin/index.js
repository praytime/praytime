
const util = require('../../../util')

const ids = [
  {
    uuid4: '6de66ece-24de-45c7-861c-2b3227367e49',
    name: 'Islamic Community Center',
    url: 'http://www.iccelgin.com/',
    timeZoneId: 'America/Chicago',
    address: '345 Heine Ave, Elgin, IL 60123, USA',
    placeId: 'ChIJvXNTvzkFD4gR47PA2osOIPU',
    geo: {
      latitude: 42.0426692,
      longitude: -88.31287669999999
    }
  }
]

exports.run = async () => {
  const data = await util.loadJson('https://masjidal.com/api/v1/time?masjid_id=VGA6rAeq')

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
