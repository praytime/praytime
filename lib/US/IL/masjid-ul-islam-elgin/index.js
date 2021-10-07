const axios = require('axios')
const util = require('../../../util')

const results = [
  {
    uuid4: 'a3f6b73c-6e49-4651-a95f-5af2d6ac8c09',
    name: 'Masjid Ul Islam',
    url: 'http://www.iieonline.org/',
    address: '1280 Bluff City Blvd, Elgin, IL 60120, USA',
    placeId: 'ChIJvTOnbYQGD4gRP4Y3OQWN74I',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 42.018804,
      longitude: -88.240546
    }
  }
]

exports.run = async () => {
  const response = await axios.get('https://masjidal.com/api/v1/time?masjid_id=OMA58LrE')

  const data = response.data
  if (data.status === 'success') {
    const iqama = data.data.iqama
    util.setIqamaTimes(results[0], [
      iqama.fajr,
      iqama.zuhr,
      iqama.asr,
      iqama.maghrib,
      iqama.isha,
    ])
    results[0].juma1 = iqama.jummah1
    results[0].juma2 = iqama.jummah2
  }

  return results
}
