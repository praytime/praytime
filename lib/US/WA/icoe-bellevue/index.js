const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '78ffa969-e54f-4a4d-92cb-c049a9088d7f',
    name: 'Islamic Center of Eastside',
    url: 'http://www.eastsidemosque.com/',
    timeZoneId: 'America/Los_Angeles',
    address: '14230 NE 21st St, Bellevue, WA 98007, USA',
    geo: {
      latitude: 47.629128,
      longitude: -122.150907
    },
    placeId: 'ChIJFRtUtEtskFQRFS42y762fRY'
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://www.eastsidemosque.com/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $('div.azan-time-body > table:nth-child(1) > tbody > tr:nth-child(1) > td:nth-child(3)').first().text().trim()
  results[0].zuhrIqama = $('div.azan-time-body > table:nth-child(1) > tbody > tr:nth-child(3) > td:nth-child(3)').first().text().trim()
  results[0].asrIqama = $('div.azan-time-body > table:nth-child(1) > tbody > tr:nth-child(4) > td:nth-child(3)').first().text().trim()
  results[0].maghribIqama = $('div.azan-time-body > table:nth-child(1) > tbody > tr:nth-child(6) > td:nth-child(3)').first().text().trim()
  results[0].ishaIqama = $('div.azan-time-body > table:nth-child(1) > tbody > tr:nth-child(7) > td:nth-child(3)').first().text().trim()
  results[0].juma1 = $('div.azan-time-body > table:nth-child(2) > tbody > tr:nth-child(1) > td.lower-text').first().text().replace(/\s/g, '').match(/\d{1,2}:\d{2}/)[0]
  results[0].juma2 = $('div.azan-time-body > table:nth-child(2) > tbody > tr:nth-child(2) > td.lower-text').first().text().replace(/\s/g, '').match(/\d{1,2}:\d{2}/)[0]

  return results
}
