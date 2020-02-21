const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '56694533-c7f4-450f-921f-ec50be11a691',
    name: 'Ethiopian Muslims Assocation of Seattle',
    url: 'http://www.emasseattle.org/',
    timeZoneId: 'America/Los_Angeles',
    address: '3730 S 166th St, SeaTac, WA 98188, USA',
    geo: {
      latitude: 47.455067,
      longitude: -122.284984
    },
    placeId: 'ChIJCeZl3UpDkFQRuLd31_Ik9z0'
  }
]

exports.run = async () => {
  const response = await axios.get('http://www.solah.org/')
  const $ = cheerio.load(response.data)
  const date = new Date()

  results[0].crawlTime = date

  const p = $('div.prayerTimeTable td.iqamahOnly')

  results[0].fajrIqama = p.eq(0).text().trim()
  results[0].zuhrIqama = p.eq(1).text().trim()
  results[0].asrIqama = p.eq(2).text().trim()
  results[0].maghribIqama = p.eq(3).text().trim()
  results[0].ishaIqama = p.eq(4).text().trim()
  results[0].juma1 = $('div.prayerTimeTable td:contains("KHUTB")').text().match(/\d{1,2}:\d{2}/)[0]

  return results
}
