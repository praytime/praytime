const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '1b621892-d674-44f9-b9ce-6bf939e67323',
    name: 'Islamic Association of Fort Worth Dar Un-Noor Center',
    url: 'http://dncfw.org/',
    timeZoneId: 'America/Chicago',
    address: '5747 Westcreek Dr, Fort Worth, TX 76133, USA',
    geo: {
      latitude: 32.660184,
      longitude: -97.36145
    },
    placeId: 'ChIJW0IhWd1tToYRc2-SuVrbBfc'
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://dncfw.org/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  // results[0].fajrIqama = $('#mh_display_prayer_times-2 > div > table:nth-child(2) > tbody > tr:nth-child(1) > td:nth-child(2)').text().trim()
  // results[0].zuhrIqama = $('#mh_display_prayer_times-2 > div > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2)').text().trim()
  // results[0].asrIqama = $('#mh_display_prayer_times-2 > div > table:nth-child(2) > tbody > tr:nth-child(3) > td:nth-child(2)').text().trim()
  // results[0].maghribIqama = $('#mh_display_prayer_times-2 > div > table:nth-child(2) > tbody > tr:nth-child(4) > td:nth-child(2)').text().trim()
  // results[0].ishaIqama = $('#mh_display_prayer_times-2 > div > table:nth-child(2) > tbody > tr:nth-child(5) > td:nth-child(2)').text().trim()

  results[0].fajrIqama = 'check website'
  results[0].zuhrIqama = 'check website'
  results[0].asrIqama = 'check website'
  results[0].maghribIqama = 'check website'
  results[0].ishaIqama = 'check website'
  results[0].juma1 = $('#mh_display_prayer_times-2 > div > table:nth-child(3) > tbody > tr:nth-child(2) > td:nth-child(2)').text().trim()

  return results
}
