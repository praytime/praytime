const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: 'e4dfb36d-7b2e-4ce8-8487-e544569ab459',
    name: 'Sammamish Mosque',
    url: 'http://www.sammamishmosque.com/',
    timeZoneId: 'America/Los_Angeles',
    address: '22011 SE 20th St, Sammamish, WA 98075, USA',
    geo: {
      latitude: 47.591208,
      longitude: -122.04579
    },
    placeId: 'ChIJqYkmdyFukFQRZTbGcP7iuvg'
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://www.muslimfeed.com/timesframe.aspx?mi=2110')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $('#trFajr > td:nth-child(3)').text().trim()
  results[0].zuhrIqama = $('#trDhuhr > td:nth-child(3)').text().trim()
  results[0].asrIqama = $('#trAsr > td:nth-child(3)').text().trim()
  results[0].maghribIqama = $('#trMaghrib > td:nth-child(3)').text().trim()
  results[0].ishaIqama = $('#trIsha > td:nth-child(3)').text().trim()
  results[0].juma1 = $('#tblDailyTimes > tbody > tr:nth-child(9) > td:nth-child(2)').text().trim()

  return results
}
