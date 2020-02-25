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

  const p = $('table.dptTimetable td.jamah')

  results[0].crawlTime = date

  results[0].fajrIqama = p.eq(0).text().trim()
  results[0].zuhrIqama = p.eq(1).text().trim()
  results[0].asrIqama = p.eq(2).text().trim()
  results[0].maghribIqama = p.eq(3).text().trim()
  results[0].ishaIqama = p.eq(4).text().trim()
  results[0].juma1 = p.eq(5).text().match(/\d{1,2}:\d{2}/g)[0]
  results[0].juma2 = p.eq(5).text().match(/\d{1,2}:\d{2}/g)[1]

  return results
}
