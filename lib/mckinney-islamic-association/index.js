const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: 'dfab4495-7f4a-4cf7-998f-d7056fff7e97',
    name: 'McKinney Islamic Association',
    url: 'http://www.mckinneymasjid.org/',
    address: '2940 Eldorado Pkwy, McKinney, TX 75070, USA',
    geo: {
      latitude: 33.169004,
      longitude: -96.66308
    },
    placeId: 'ChIJeYmpKVURTIYRKFS4Iqx0hfY',
    timeZoneId: 'America/Chicago'
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://www.mckinneymasjid.org/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $('#wp_threebox_plugin-14 > div > div > div.content > table > tbody > tr:nth-child(2) > td:nth-child(3)').text().trim()
  results[0].zuhrIqama = $('#wp_threebox_plugin-14 > div > div > div.content > table > tbody > tr:nth-child(3) > td:nth-child(3)').text().trim()
  results[0].asrIqama = $('#wp_threebox_plugin-14 > div > div > div.content > table > tbody > tr:nth-child(4) > td:nth-child(3)').text().trim()
  results[0].maghribIqama = $('#wp_threebox_plugin-14 > div > div > div.content > table > tbody > tr:nth-child(5) > td:nth-child(3)').text().trim()
  results[0].ishaIqama = $('#wp_threebox_plugin-14 > div > div > div.content > table > tbody > tr:nth-child(6) > td:nth-child(3)').text().trim()
  results[0].juma1 = $('#wp_threebox_plugin-14 > div > div > div.content > table > tbody > tr:nth-child(7) > td:nth-child(2)').text().trim()
  results[0].juma2 = $('#wp_threebox_plugin-14 > div > div > div.content > table > tbody > tr:nth-child(8) > td:nth-child(2)').text().trim()

  return results
}
