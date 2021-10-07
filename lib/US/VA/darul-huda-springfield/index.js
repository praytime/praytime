const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '04382a38-b718-4576-8647-e496a9c52cff',
    name: 'Darul Huda',
    url: 'https://www.daralhuda.org/',
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
  const response = await axios.get('https://www.daralhuda.org/')
  const $ = cheerio.load(response.data)

  const jumma = $("#services td:contains('Bayan')")


  results[0].fajrIqama = $("#services td:contains('Fajr') ~ td").text().trim()
  results[0].zuhrIqama = $("#services td:contains('Dhur') ~ td").text().trim()
  results[0].asrIqama = $("#services td:contains('Asr') ~ td").text().trim()
  results[0].maghribIqama = $("#services td:contains('Maghrib') ~ td").text().trim()
  results[0].ishaIqama = $("#services td:contains('Isha') ~ td").text().trim()
  results[0].juma1 = jumma.eq(0).text().trim()
  results[0].juma2 = jumma.eq(1).text().trim()

  return results
}
