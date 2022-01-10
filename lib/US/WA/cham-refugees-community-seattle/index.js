const util = require('../../../util')

const ids = [
  {
    uuid4: '19247d38-dce3-4ed1-a3a3-ed2710c8306a',
    name: 'Cham Refugees Community',
    url: 'https://www.chamrefugeescommunity.org/',
    timeZoneId: 'America/Los_Angeles',
    address: '5945 39th Ave S, Seattle, WA 98118, USA',
    placeId: 'ChIJa_heFQdqkFQRp3KV8ebB7rw',
    geo: {
      latitude: 47.5484524,
      longitude: -122.2837274
    }
  }
]

exports.run = async () => {
  const data = await util.loadJson('https://masjidal.com/api/v1/time?masjid_id=lJAmRjdR')

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
