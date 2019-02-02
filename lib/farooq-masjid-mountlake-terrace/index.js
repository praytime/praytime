// const axios = require('axios')
// const cheerio = require('cheerio')

exports.results = [
  {
    uuid4: 'caa87794-d6bc-4f85-ac85-abadcebfa080',
    name: 'Masjid Umar Al-Farooq',
    url: 'http://www.farooqmasjid.org/',
    address: '5507 238th St SW, Mountlake Terrace, WA 98043, USA',
    placeId: 'ChIJs9meeREQkFQR4W-p6fYmZkg',
    timeZoneId: 'America/Los_Angeles',
    geo: {
      latitude: 47.783136,
      longitude: -122.308054
    }
  }
]

// exports.run = async () => {
//   const date = new Date()
//   const response = await axios.get('http://www.farooqmasjid.org/')
//   const $ = cheerio.load(response.data)

//   results[0].crawlTime = date

//   results[0].fajrIqama = $('td:contains(Fajr) + td').text().trim()
//   results[0].zuhrIqama = $('td:contains(Dhuhr) + td').text().trim()
//   results[0].asrIqama = $('td:contains(Asr) + td').text().trim()
//   results[0].maghribIqama = $('td:contains(Maghrib) + td').text().trim()
//   results[0].ishaIqama = $('td:contains(Isha) + td').text().trim()
//   results[0].juma1 = $('td:contains(Jummuah) + td').text().trim()

//   return results
// }
