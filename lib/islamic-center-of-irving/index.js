const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '6948d2fc-99ae-4bfa-a459-a2db0dd43802',
    name: 'Islamic Center of Irving',
    url: 'https://irvingmasjid.org/',
    timeZoneId: 'America/Chicago',
    address: '2555 Esters Rd, Irving, TX 75062, USA',
    geo: {
      latitude: 32.843397,
      longitude: -97.010652
    },
    placeId: 'ChIJfegQy4aBToYRcINprM4zk7M'
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://irvingmasjid.org/')
  const $ = cheerio.load(response.data)

  const j = $("p:contains('1st Jumm') > span > strong").text().match(/\d{1,2}:\d{2}/g)

  results[0].crawlTime = date

  results[0].fajrIqama = $("th:contains('Fajr') ~ td.jamah").text().trim()
  results[0].zuhrIqama = $("th:contains('Zuhr') ~ td.jamah").text().trim()
  results[0].asrIqama = $("th:contains('Asr') ~ td.jamah").text().trim()
  results[0].maghribIqama = $("th:contains('Maghrib') ~ td.jamah").text().trim()
  results[0].ishaIqama = $("th:contains('Isha') ~ td.jamah").text().trim()
  results[0].juma1 = j[0]
  results[0].juma2 = j[1]

  return results
}
