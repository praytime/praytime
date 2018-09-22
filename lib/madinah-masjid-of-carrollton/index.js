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

  results[0].fajrIqama = $('#table1 > tbody > tr:nth-child(1) > td:nth-child(2)').text().trim()
  results[0].zuhrIqama = $('#table1 > tbody > tr:nth-child(2) > td:nth-child(2)').text().trim()
  results[0].asrIqama = $('#table1 > tbody > tr:nth-child(3) > td:nth-child(2)').text().trim()
  results[0].maghribIqama = $('#table1 > tbody > tr:nth-child(4) > td:nth-child(2)').text().trim()
  results[0].ishaIqama = $('#table1 > tbody > tr:nth-child(5) > td:nth-child(2)').text().trim()
  results[0].juma1 = $('#table1 > tbody > tr:nth-child(6) > td:nth-child(2)').text().trim()

  return results
}
