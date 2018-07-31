const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '70b2e71e-dab0-417d-a8c6-80076fa141e1',
    name: 'Islamic Center of Wheaton',
    url: 'https://www.icwonline.org/',
    address: '900 E Geneva Rd, Wheaton, IL 60187, USA',
    timeZoneId: 'America/Chicago',
    placeId: 'ChIJBTAAF6FUDogRMwiFUx8max4',
    geo: {
      latitude: 41.887677,
      longitude: -88.093184
    }
  }
]

exports.run = async () => {
  const date = new Date()
  let response = await axios.get('https://masjidal.com/api/v1/time?masjid_id=rGAEvdn2')
  const data = response.data
  if (data.status === 'success') {
    results[0].crawlTime = date
    results[0].fajrIqama = data.data.iqama.fajr
    results[0].zuhrIqama = data.data.iqama.zuhr
    results[0].asrIqama = data.data.iqama.asr
    results[0].maghribIqama = data.data.iqama.maghrib
    results[0].ishaIqama = data.data.iqama.isha
  }

  // Juma time is in template
  response = await axios.get('http://masjidal.com/icw/')
  const $ = cheerio.load(response.data)
  results[0].juma1 = $('#jummah1 > td.salah').text().trim()

  return results
}
