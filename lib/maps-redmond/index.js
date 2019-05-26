const axios = require('axios')
const cheerio = require('cheerio')

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://www.mapsredmond.org/')
  const $ = cheerio.load(response.data)

  return [
    {
      uuid4: '5be0348d-06cc-49b1-923f-c8acdef8e27e',
      crawlTime: date,
      name: 'Muslim Association of Puget Sound',
      url: 'https://www.mapsredmond.org/',
      address: '17550 NE 67th Ct, Redmond, WA 98052, USA',
      placeId: 'ChIJ2dRVrb1ykFQR4Jt-FGpMGLA',
      timeZoneId: 'America/Los_Angeles',
      geo: {
        latitude: 47.665648,
        longitude: -122.106557
      },

      // fajrIqama: $('th:contains("Fajr") ~ td').eq(-1).text().trim(),
      // zuhrIqama: $('th:contains("Zuhr") ~ td').eq(-1).text().trim(),
      // asrIqama: $('th:contains("Asr") ~ td').eq(-1).text().trim(),
      // maghribIqama: $('th:contains("Maghrib") ~ td').eq(-1).text().trim(),
      // ishaIqama: $('th:contains("Isha") ~ td').eq(-1).text().trim(),
      fajrIqama: 'check website',
      zuhrIqama: 'check website',
      asrIqama: 'check website',
      maghribIqama: 'check website',
      ishaIqama: 'check website',
      juma1: $('p:contains("Jumah")').text().match(/\d{1,2}:\d{1,2}/)[0]
    }
  ]
}
