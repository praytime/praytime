const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: 'a988f430-650d-4918-800d-21be23ca34a1',
    name: 'Islamic Center of Romeoville',
    url: 'http://thfoundation.com',
    address: '14455 S Budler Rd, Plainfield, IL 60544, USA',
    timeZoneId: 'America/Chicago',
    placeId: 'ChIJ2eKwWJlfDogRss6NduNi-TM',
    geo: {
      latitude: 41.620172,
      longitude: -88.153147
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://thfoundation.com')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $('td:contains(Fajr) + td').text().trim()
  results[0].zuhrIqama = $('td:contains(Zuhar) + td').text().trim()
  results[0].asrIqama = $('td:contains(Asr) + td').text().trim()
  results[0].maghribIqama = $('td:contains(Maghrib) + td').text().trim()
  results[0].ishaIqama = $('td:contains(Isha) + td').text().trim()
  results[0].juma1 = $('th:contains(Jumu)').text().match(/\d{1,2}:\d{2}/)[0]

  return results
}
