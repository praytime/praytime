const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '65e107c8-b056-457a-a6f1-06280d6410f0',
    name: 'At-Takaful Islamic Society',
    url: 'http://icconline.org/',
    address: '5933 N Lincoln Ave, Chicago, IL 60659, USA',
    placeId: 'ChIJvbnzRRrOD4gRP2mO5m6be7E',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 41.989204,
      longitude: -87.70492
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://icconline.org/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $('td.masjidnow-salah-time-iqamah.masjidnow-fajr').first().text().trim()
  results[0].zuhrIqama = $('td.masjidnow-salah-time-iqamah.masjidnow-dhuhr').text().trim()
  results[0].asrIqama = $('td.masjidnow-salah-time-iqamah.masjidnow-asr').text().trim()
  results[0].maghribIqama = $('td.masjidnow-salah-time-iqamah.masjidnow-maghrib').text().trim()
  results[0].ishaIqama = $('td.masjidnow-salah-time-iqamah.masjidnow-isha').text().trim()
  results[0].juma1 = $('#text-6 > div').text().match(/1st:\s+Talk\s(\d{1,2}:\d{1,2})/)[1]
  results[0].juma2 = $('#text-6 > div').text().match(/2nd:\s+Talk\s(\d{1,2}:\d{1,2})/)[1]

  return results
}
