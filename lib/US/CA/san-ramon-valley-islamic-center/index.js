const axios = require('axios')
const util = require('../../../util')

const results = [
  {
    uuid4: '06d76993-f828-4543-a45a-c6a5acc02641',
    name: 'San Ramon Valley Islamic Center',
    url: 'http://www.srvic.org/',
    address: '2232 Camino Ramon, San Ramon, CA 94583, USA',
    placeId: 'ChIJgZMAveryj4ARu8cHwsFnX0E',
    timeZoneId: 'America/Los_Angeles',
    geo: {
      latitude: 37.776787,
      longitude: -121.969178
    },
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://srvic.org/index.php?option=com_kaprayertimes&task=ajax.gettimes&id=4')

  const data = response.data
  if (data.status === 'success') {
    results[0].crawlTime = date
    const iqama = data.data
    util.setIqamaTimes(results[0], [
      iqama.fajr_iqama,
      iqama.dhuhr_iqama,
      iqama.asr_iqama,
      iqama.maghrib_iqama,
      iqama.isha_iqama,
    ])
    results[0].juma1 = iqama.jumuah
  }

  return results
}
