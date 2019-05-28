const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '6515de3b-bbda-49aa-97bd-6962072a9880',
    name: 'Dar Al-Hijrah',
    url: 'https://hijrah.org/',
    address: '3159 Row St, Falls Church, VA 22044, USA',
    timeZoneId: 'America/New_York',
    placeId: 'ChIJKZHrdH60t4kRDYVdiyL8Gps',
    geo: {
      latitude: 38.861948,
      longitude: -77.14697
    }
  },
  {
    uuid4: 'ddafbb69-e03a-425d-a687-4d2be43173eb',
    name: 'MAS Community Center',
    url: 'https://hijrah.org/',
    address: '6408 Edsall Rd, Alexandria, VA 22312, USA',
    timeZoneId: 'America/New_York',
    placeId: 'ChIJl2nIW_Cyt4kRQHNIy86vKnc',
    geo: {
      latitude: 38.80509,
      longitude: -77.15775
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://hijrah.org/')
  const $ = cheerio.load(response.data)
  const j = $('#text-2 > div.textwidget > center').text().match(/(\d{1,2}:\d{1,2})/g)
  results[0].crawlTime = date
  results[0].fajrIqama = $('th:contains(Fajr) ~ td.jamah').text()
  results[0].zuhrIqama = $('th:contains(Zuhr) ~ td.jamah').text()
  results[0].asrIqama = $('th:contains(Asr) ~ td.jamah').text()
  results[0].maghribIqama = $('th:contains(Maghrib) ~ td.jamah').text()
  results[0].ishaIqama = $('th:contains(Isha) ~ td.jamah').text()
  results[0].juma1 = j[0]
  results[0].juma2 = j[1]
  results[0].juma3 = j[2]

  results[1].crawlTime = date
  results[1].juma1 = j[3]
  results[1].juma2 = j[4]

  return results
}
