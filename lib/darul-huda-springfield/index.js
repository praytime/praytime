const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '04382a38-b718-4576-8647-e496a9c52cff',
    name: 'Darul Huda',
    url: 'http://www.daralhuda.org/',
    address: '6666 Commerce St, Springfield, VA 22150, USA',
    placeId: 'ChIJB3xk3aCyt4kRsfPHQUkEXgk',
    timeZoneId: 'America/New_York',
    geo: {
      latitude: 38.779942,
      longitude: -77.175792
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://www.daralhuda.org/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $("td:contains('Fajr') + td").text().trim()
  results[0].zuhrIqama = $("td:contains('Dhur') + td").text().trim()
  results[0].asrIqama = $("td:contains('Asr') + td").text().trim()
  results[0].maghribIqama = $("td:contains('Maghrib') + td").text().trim()
  results[0].ishaIqama = $("td:contains('Isha') + td").text().trim()
  results[0].juma1 = $("tr:contains('1st Prayer') + tr").text().match(/\d{1,2}:\d{2}/)[0]
  results[0].juma2 = $("tr:contains('2nd Prayer') + tr").text().match(/\d{1,2}:\d{2}/)[0]

  return results
}
