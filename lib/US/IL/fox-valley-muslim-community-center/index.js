const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '7bc0c531-73b4-49ae-a25b-d7525f3a6104',
    name: 'Fox Valley Muslim Community Center',
    url: 'https://www.auroramasjid.org/',
    address: '1187 Timberlake Dr, Aurora, IL 60506, USA',
    placeId: 'ChIJpyouLQXlDogRbZ1oyLj1418',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 41.780753,
      longitude: -88.353097
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://www.auroramasjid.org/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  const p = $('#WRchTxt3 h4')

  results[0].fajrIqama = p.eq(1).text().match(/(\d{1,2}:\d{2}\s*\w+)/)[0]
  results[0].zuhrIqama = p.eq(2).text().match(/(\d{1,2}:\d{2}\s*\w+)/)[0]
  results[0].asrIqama = p.eq(3).text().match(/(\d{1,2}:\d{2}\s*\w+)/)[0]
  results[0].maghribIqama = p.eq(4).text().trim()
  results[0].ishaIqama = p.eq(5).text().match(/(\d{1,2}:\d{2}\s*\w+)/)[0]
  results[0].juma1 = p.eq(6).text().match(/(\d{1,2}:\d{2}\s*\w+)/)[0]

  return results
}
