const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '3a63830f-a595-481e-8f96-484f866a4a69',
    name: 'Madinah Masjid of Carrollton',
    url: 'http://www.madinahmasjid.com/',
    timeZoneId: 'America/Chicago',
    address: '2180 Old Denton Rd, Carrollton, TX 75006, USA',
    geo: {
      latitude: 32.975131,
      longitude: -96.90938
    },
    placeId: 'ChIJHWptiAgmTIYRAag4hOV6iAQ'
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://www.madinahmasjid.com/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $("td:contains('Fajr') + td").text().trim()
  results[0].zuhrIqama = $("td:contains('Zuhr') + td").text().trim()
  results[0].asrIqama = $("td:contains('Asr') + td").text().trim()
  results[0].maghribIqama = $("td:contains('Magrib') + td").text().trim()
  results[0].ishaIqama = $("td:contains('Isha') + td").text().trim()
  results[0].juma1 = $("td:contains('Friday') + td").text().trim()

  return results
}
