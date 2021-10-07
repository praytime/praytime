const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '3c9ad4a0-1eec-43ec-ad55-c92531c5acf5',
    name: 'Islamic Center of Kent',
    url: 'http://islamiccenterofkent.org',
    timeZoneId: 'America/Los_Angeles',
    address: '20857 108th Ave SE, Kent, WA 98031, USA',
    geo: {
      latitude: 47.414238,
      longitude: -122.198083
    },
    placeId: 'ChIJa9oRvTVckFQRXhoz138Dq08'
  }
]
exports.run = async () => {
  const response = await axios.get('http://islamiccenterofkent.org/WP')
  const $ = cheerio.load(response.data)


  results[0].fajrIqama = $('.dptTimetable tr:nth-child(4) > td:last-child').text().trim()
  results[0].zuhrIqama = $('.dptTimetable tr:nth-child(6) > td:last-child').text().trim()
  results[0].asrIqama = $('.dptTimetable tr:nth-child(7) > td:last-child').text().trim()
  results[0].maghribIqama = $('.dptTimetable tr:nth-child(8) > td:last-child').text().trim()
  results[0].ishaIqama = $('.dptTimetable tr:nth-child(9) > td:last-child').text().trim()
  results[0].juma1 = $('.dptTimetable tr:nth-child(1) > th').text().match(/\d{1,2}:\d{2}/)[0]

  return results
}
