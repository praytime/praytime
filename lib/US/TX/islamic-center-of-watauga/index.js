const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '1044f0dd-1925-4cef-a3fe-0e2a8e98c732',
    name: 'Islamic Center of Watauga',
    url: 'http://icwtx.com/',
    timeZoneId: 'America/Chicago',
    address: '6005 Chapman Rd, Watauga, TX 76148, USA',
    geo: {
      latitude: 32.868235,
      longitude: -97.251758
    },
    placeId: 'ChIJ5WpIyQl4ToYR32ky-pTtXeI'
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://icwtx.com/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $('#mh_display_prayer_times-2 > div > table:nth-child(2) > tbody > tr:nth-child(1) > td:nth-child(3)').text().trim()
  results[0].zuhrIqama = $('#mh_display_prayer_times-2 > div > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(3)').text().trim()
  results[0].asrIqama = $('#mh_display_prayer_times-2 > div > table:nth-child(2) > tbody > tr:nth-child(3) > td:nth-child(3)').text().trim()
  results[0].maghribIqama = $('#mh_display_prayer_times-2 > div > table:nth-child(2) > tbody > tr:nth-child(4) > td:nth-child(3)').text().trim()
  results[0].ishaIqama = $('#mh_display_prayer_times-2 > div > table:nth-child(2) > tbody > tr:nth-child(5) > td:nth-child(3)').text().trim()
  results[0].juma1 = $('#mh_display_prayer_times-2 > div > table:nth-child(3) > tbody > tr:nth-child(2) > td:nth-child(2)').text().trim()
  results[0].juma2 = $('#mh_display_prayer_times-2 > div > table:nth-child(3) > tbody > tr:nth-child(3) > td:nth-child(2)').text().trim()

  return results
}
