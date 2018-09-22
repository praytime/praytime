const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: 'e4e3fa99-3df8-4e8c-8e37-5d353c2b51eb',
    name: 'Islamic Assocation of North Texas',
    url: 'https://iant.com/',
    timeZoneId: 'America/Chicago',
    address: '840 Abrams Rd, Richardson, TX 75081, USA',
    geo: {
      latitude: 32.939541,
      longitude: -96.730714
    },
    placeId: 'ChIJJ7Bj_J4fTIYRfWVohOA_w60'
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://iant.com/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $('#panel-430-0-0-0 > div > table > tbody > tr:nth-child(2) > td:nth-child(3)').text().trim()
  results[0].zuhrIqama = $('#panel-430-0-0-0 > div > table > tbody > tr:nth-child(3) > td:nth-child(3)').text().trim()
  results[0].asrIqama = $('#panel-430-0-0-0 > div > table > tbody > tr:nth-child(4) > td:nth-child(3)').text().trim()
  results[0].maghribIqama = $('#panel-430-0-0-0 > div > table > tbody > tr:nth-child(5) > td:nth-child(3)').text().trim()
  results[0].ishaIqama = $('#panel-430-0-0-0 > div > table > tbody > tr:nth-child(6) > td:nth-child(3)').text().trim()
  results[0].juma1 = $('#panel-430-0-0-0 > div > table > tbody > tr.mit_jumua > td:nth-child(2)').text().trim()

  return results
}
