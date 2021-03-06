const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: 'dfab4495-7f4a-4cf7-998f-d7056fff7e97',
    name: 'McKinney Islamic Association',
    url: 'http://www.mckinneymasjid.org/',
    address: '2940 Eldorado Pkwy, McKinney, TX 75070, USA',
    geo: {
      latitude: 33.169004,
      longitude: -96.66308
    },
    placeId: 'ChIJeYmpKVURTIYRKFS4Iqx0hfY',
    timeZoneId: 'America/Chicago'
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://www.mckinneymasjid.org/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $('td:contains("Fajr") + td').text().trim()
  results[0].zuhrIqama = $('td:contains("Dhuhr") + td').text().trim()
  results[0].asrIqama = $('td:contains("Asr") + td').text().trim()
  results[0].maghribIqama = $('td:contains("Maghrib") + td').text().trim()
  results[0].ishaIqama = $('td:contains("Isha") + td').text().trim()
  results[0].juma1 = $('td:contains("Khutbah 1") + td').text().trim()
  results[0].juma2 = $('td:contains("Khutbah 2") + td').text().trim()

  return results
}
