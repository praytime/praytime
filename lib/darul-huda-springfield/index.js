const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '04382a38-b718-4576-8647-e496a9c52cff',
    name: 'Darul Huda',
    url: 'https://darulhudausa.org/',
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
  const response = await axios.get('https://darulhudausa.org/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $("p:contains('Fajr')").text().match(/\d{1,2}:\d{2}/)[0]
  results[0].zuhrIqama = $("p:contains('Zuhr')").text().match(/\d{1,2}:\d{2}/)[0]
  results[0].asrIqama = $("p:contains('Asr')").text().match(/\d{1,2}:\d{2}/)[0]
  results[0].maghribIqama = $("p:contains('Maghrib')").text().trim()
  results[0].ishaIqama = $("p:contains('Isha')").text().match(/\d{1,2}:\d{2}/)[0]
  results[0].juma1 = $("p:contains('1st Bayaan')").text().match(/\d{1,2}:\d{2}/)[0]
  results[0].juma2 = $("p:contains('2nd Bayaan')").text().match(/\d{1,2}:\d{2}/)[0]

  return results
}
