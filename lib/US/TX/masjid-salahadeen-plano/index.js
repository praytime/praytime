const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '3e87a273-03d2-453c-b778-465c3323dfc9',
    name: 'Masjid Salahadeen',
    url: 'http://masjidsalahadeen.org/',
    timeZoneId: 'America/Chicago',
    address: '6100 K Ave, Plano, TX 75074, USA',
    geo: {
      latitude: 33.058068,
      longitude: -96.688619
    },
    placeId: 'ChIJO5PKkcAZTIYRTh4L65JMhEs'
  }
]

exports.run = async () => {
  const response = await axios.get('http://masjidsalahadeen.org/')
  const $ = cheerio.load(response.data)

  results[0].fajrIqama = $('td:contains(Fajr) + td').text().trim()
  results[0].zuhrIqama = $('td:contains(Dhuhr) + td').text().trim()
  results[0].asrIqama = $('td:contains(Asr) + td').text().trim()
  results[0].maghribIqama = $('td:contains(Maghrib) + td').text().trim()
  results[0].ishaIqama = $('td:contains(Isha) + td').text().trim()
  results[0].juma1 = $('td:contains(Khutba) + td').text().match(/\d{1,2}:\d{2}/)[0]
  results[0].juma2 = 'check website'

  return results
}
