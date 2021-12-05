const util = require('../../../util')

const ids = [
  {
    uuid4: 'ab96494b-6d62-4629-abb1-98731ff87f77',
    name: 'Sacred Learning',
    url: 'https://www.sacredlearning.org/',
    address: '3900 W Devon Ave, Lincolnwood, IL 60712, USA',
    placeId: 'ChIJuV7YxkLOD4gR_GRpXOWNxH4',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 41.997994,
      longitude: -87.726087
    }
  }
]

exports.run = async () => {
  const data = await util.loadJson('https://masjidal.com/api/v1/time?masjid_id=nzKz84AO')

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
