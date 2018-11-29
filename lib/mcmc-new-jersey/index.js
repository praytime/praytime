const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: 'f54313a3-8f9e-4064-8626-0f473a47bc34',
    name: 'Muslim Center of Middlesex County',
    url: 'https://www.mcmcnj.org',
    address: '1000 Hoes Ln, Piscataway Township, NJ 08854, USA',
    placeId: 'ChIJ42G3l27Hw4kR9ZOlVzSlL6g',
    timeZoneId: 'America/New_York',
    geo: {
      latitude: 40.529657,
      longitude: -74.468165
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://www.mcmcnj.org')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $('#dailyprayertime-2 > table > tbody > tr:nth-child(3) > td.jamah').text().match(/\d{1,2}:\d{2}/)[0]
  results[0].zuhrIqama = $('#dailyprayertime-2 > table > tbody > tr:nth-child(5) > td.jamah').text().match(/\d{1,2}:\d{2}/)[0]
  results[0].asrIqama = $('#dailyprayertime-2 > table > tbody > tr:nth-child(6) > td.jamah').text().match(/\d{1,2}:\d{2}/)[0]
  results[0].maghribIqama = $('#dailyprayertime-2 > table > tbody > tr:nth-child(7) > td.jamah').text().match(/\d{1,2}:\d{2}/)[0]
  results[0].ishaIqama = $('#dailyprayertime-2 > table > tbody > tr:nth-child(8) > td.jamah').text().match(/\d{1,2}:\d{2}/)[0]
  results[0].juma1 = 'check website'
  results[0].juma2 = 'check website'

  return results
}
