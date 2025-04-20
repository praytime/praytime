const util = require('../../../util')

const ids = [
  {
    uuid4: '31fcb158-9de2-4739-96df-cc4db4688189',
    name: 'Masjid Hidayath (Islamic Center of Aurora)',
    url: 'http://masjidhidayath.com/',
    timeZoneId: 'America/Chicago',
    address: '543 S Lake St, Aurora, IL 60506, USA',
    placeId: 'ChIJaahZgKPlDogRueGjTIdJgUA',
    geo: {
      latitude: 41.7517794,
      longitude: -88.3298903
    }
  }
]
// https://timing.athanplus.com/masjid/widgets/embed?theme=1&masjid_id=pVdwNMAe&allowTransparency='true'
exports.run = async () => {
  const data = await util.loadJson(
    'https://masjidal.com/api/v1/time?masjid_id=pVdwNMAe'
  )

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
