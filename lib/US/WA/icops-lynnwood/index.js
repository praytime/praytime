const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '55196a3b-8772-4046-a9df-57b47c3ca3a0',
    name: 'Islamic Center of Puget Sound',
    url: 'http://icpugetsound.org/',
    timeZoneId: 'America/Los_Angeles',
    address: 'Suite B1, 13319 Mukilteo Speedway, Lynnwood, WA 98087, USA',
    geo: {
      latitude: 47.874552,
      longitude: -122.274526
    },
    placeId: 'ChIJxZgT7RUEkFQRTv6E2cWAtL8'
  }
]

exports.run = async () => {
  const response = await axios.get('http://www.muslimfeed.com/timesframe.aspx?mi=2105')
  const $ = cheerio.load(response.data)


  results[0].fajrIqama = $('#trFajr > td:nth-child(3)').text().trim()
  results[0].zuhrIqama = $('#trDhuhr > td:nth-child(3)').text().trim()
  results[0].asrIqama = $('#trAsr > td:nth-child(3)').text().trim()
  results[0].maghribIqama = $('#trMaghrib > td:nth-child(3)').text().trim()
  results[0].ishaIqama = $('#trIsha > td:nth-child(3)').text().trim()
  results[0].juma1 = $('#tblDailyTimes > tbody > tr:nth-child(9) > td:nth-child(2)').text().trim()

  return results
}
