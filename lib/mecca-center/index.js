const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '12274a9a-4d61-4239-ba86-1c46bd12dc19',
    name: 'MECCA Center',
    url: 'http://meccacenter.org',
    address: '16W560 91st Street, Willowbrook, IL 60527, USA',
    placeId: 'ChIJuwioielFDogRbf6JF65FuZk',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 41.724164,
      longitude: -87.948055
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://meccacenter.org')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date
  results[0].fajrIqama = $('th:contains("Fajr") ~ td').eq(-1).text().trim()
  results[0].zuhrIqama = $('th:contains("Zuhr") ~ td').eq(-1).text().trim()
  results[0].asrIqama = $('th:contains("Asr") ~ td').eq(-1).text().trim()
  results[0].maghribIqama = $('th:contains("Maghrib") ~ td').eq(-1).text().trim()
  results[0].ishaIqama = $('th:contains("Isha") ~ td').eq(-1).text().trim()
  results[0].juma1 = '1:00pm (check website)'

  return results
}
