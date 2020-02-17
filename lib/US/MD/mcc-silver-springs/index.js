const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: 'edab15c2-2ce6-4d7b-bba6-41276925fc6d',
    name: 'Muslim Community Center',
    url: 'https://mccmd.org',
    address: '15200 New Hampshire Ave, Silver Spring, MD 20905, USA',
    placeId: 'ChIJL04gSqLat4kRdFork7aKdGI',
    timeZoneId: 'America/New_York',
    geo: {
      latitude: 39.105497,
      longitude: -77.003608
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://mccmd.org')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $('body > section.a.slider-widget > div > div.prayer-time > div > ul > table > tbody > tr:nth-child(3) > td:nth-child(2)').text().trim()
  results[0].zuhrIqama = $('body > section.a.slider-widget > div > div.prayer-time > div > ul > table > tbody > tr:nth-child(4) > td:nth-child(2)').text().trim()
  results[0].asrIqama = $('body > section.a.slider-widget > div > div.prayer-time > div > ul > table > tbody > tr:nth-child(5) > td:nth-child(2)').text().trim()
  results[0].maghribIqama = $('body > section.a.slider-widget > div > div.prayer-time > div > ul > table > tbody > tr:nth-child(6) > td:nth-child(2)').text().trim()
  results[0].ishaIqama = $('body > section.a.slider-widget > div > div.prayer-time > div > ul > table > tbody > tr:nth-child(7) > td:nth-child(2)').text().trim()
  results[0].juma1 = $('body > section.a.slider-widget > div > div.prayer-time > div > ul > table > tbody > tr:nth-child(8) > td:nth-child(2)').text().trim()
  results[0].juma2 = $('body > section.a.slider-widget > div > div.prayer-time > div > ul > table > tbody > tr:nth-child(9) > td:nth-child(2)').text().trim()

  return results
}
