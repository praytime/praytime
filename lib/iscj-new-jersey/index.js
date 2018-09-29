const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '36815bd3-d6d5-44a5-a3c2-33a9c5ea42fb',
    name: 'Islamic Society of Central Jersey',
    url: 'https://iscj.org/',
    address: '4145 US-1, Monmouth Junction, NJ 08852, USA',
    placeId: 'ChIJR6vNPjjdw4kR0c3GWMN_KE4',
    timeZoneId: 'America/New_York',
    geo: {
      latitude: 40.387797,
      longitude: -74.571199
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://iscj.org/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $('#panel-329-1-3-1 > div > table > tbody > tr:nth-child(3) > td.jamah').text().match(/\d{1,2}:\d{2}/)[0]
  results[0].zuhrIqama = '-' // $('#panel-329-1-3-1 > div > table > tbody > tr:nth-child(5) > td.jamah').text().match(/\d{1,2}:\d{2}/)[0]
  results[0].asrIqama = $('#panel-329-1-3-1 > div > table > tbody > tr:nth-child(7) > td.jamah').text().match(/\d{1,2}:\d{2}/)[0]
  results[0].maghribIqama = $('#panel-329-1-3-1 > div > table > tbody > tr:nth-child(8) > td.jamah').text().match(/\d{1,2}:\d{2}/)[0]
  results[0].ishaIqama = $('#panel-329-1-3-1 > div > table > tbody > tr:nth-child(9) > td.jamah').text().match(/\d{1,2}:\d{2}/)[0]
  results[0].juma1 = $('#panel-329-1-3-1 > div > table > tbody > tr:nth-child(5) > td:nth-child(2)').text().match(/\d{1,2}:\d{2}/)[0]
  results[0].juma2 = $('#panel-329-1-3-1 > div > table > tbody > tr:nth-child(6) > td:nth-child(2)').text().match(/\d{1,2}:\d{2}/)[0]

  return results
}
