const axios = require('axios').default
const util = require('../../../util')

const ids = [
  {
    uuid4: '8dc6bf99-4ddc-4816-bd2c-a6b32619b4e8',
    name: 'Islamic Center of Cleveland',
    url: 'https://www.iccleveland.org/',
    timeZoneId: 'America/New_York',
    address: '6055 W 130th St, Cleveland, OH 44130, USA',
    placeId: 'ChIJufqDvxzsMIgR0e4IaTPZRHI',
    geo: {
      latitude: 41.3988454,
      longitude: -81.78069169999999
    }
  }
]

exports.run = async () => {
  const response = await axios.get('https://masjidal.com/api/v1/time?masjid_id=M0dYGxL6')

  const data = response.data
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
