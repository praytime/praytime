const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '938cdc2c-ad12-47e7-ab8f-555720b4101d',
    name: 'Masjid Dar Alhuda',
    url: 'http://www.masjiddaralhuda.com/',
    timeZoneId: 'America/Chicago',
    address: '1245 Karla Dr, Hurst, TX 76053, USA',
    geo: {
      latitude: 32.833157,
      longitude: -97.178208
    },
    placeId: 'ChIJC1hNWyt_ToYRAZM_rWwLe6w'
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://www.masjiddaralhuda.com/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $("th:contains('Fajr') ~ td:nth-child(3)").text().trim()
  results[0].zuhrIqama = $("th:contains('Zuhr') ~ td:nth-child(3)").text().trim()
  results[0].asrIqama = $("th:contains('Asr') ~ td:nth-child(3)").text().trim()
  results[0].maghribIqama = $("th:contains('Maghrib') ~ td:nth-child(3)").text().trim()
  results[0].ishaIqama = $("th:contains('Isha') ~ td:nth-child(3)").text().trim()
  results[0].juma1 = $("p:contains('Jumaa')").text().match(/\d{1,2}:\d{2}/g)[0].trim()

  return results
}
