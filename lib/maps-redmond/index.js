const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '5be0348d-06cc-49b1-923f-c8acdef8e27e',
    name: 'Muslim Association of Puget Sound',
    url: 'https://www.mapsredmond.org/',
    address: '17550 NE 67th Ct, Redmond, WA 98052, USA',
    placeId: 'ChIJ2dRVrb1ykFQR4Jt-FGpMGLA',
    timeZoneId: 'America/Los_Angeles',
    geo: {
      latitude: 47.665648,
      longitude: -122.106557
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://www.mapsredmond.org/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date
  results[0].fajrIqama = $('th.prayerName:contains("Fajr") ~ td').eq(-1).text().trim()
  results[0].zuhrIqama = $('th.prayerName:contains("Jumuah") + td').text().trim()
  results[0].asrIqama = $('th.prayerName:contains("Asr") ~ td').eq(-1).text().trim()
  results[0].maghribIqama = $('th.prayerName:contains("Maghrib") ~ td').eq(-1).text().trim()
  results[0].ishaIqama = $('th.prayerName:contains("Isha") ~ td').eq(-1).text().trim()
  results[0].juma1 = results[0].zuhrIqama

  return results
}
