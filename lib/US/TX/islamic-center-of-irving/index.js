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
  const response = await axios.get('https://irvingmasjid.org/')
  const $ = cheerio.load(response.data)


  results[0].fajrIqama = $('.dptTimetable tr:contains("Iqamah") td').eq(0).text()
  results[0].zuhrIqama = $('.dptTimetable tr:contains("Iqamah") td').eq(1).text()
  results[0].asrIqama = $('.dptTimetable tr:contains("Iqamah") td').eq(2).text()
  results[0].maghribIqama = $('.dptTimetable tr:contains("Iqamah") td').eq(3).text()
  results[0].ishaIqama = $('.dptTimetable tr:contains("Iqamah") td').eq(4).text()
  results[0].juma1 = 'check website'
  results[0].juma2 = 'check website'

  return results
}
