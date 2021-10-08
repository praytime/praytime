const axios = require('axios')
const cheerio = require('cheerio')

const ids = [
  {
    uuid4: 'fba149e9-2199-4c8a-a37d-784340297355',
    name: 'Islamic Center of Bothell',
    url: 'https://bothellmosque.org/',
    timeZoneId: 'America/Los_Angeles',
    address: '3300 Monte Villa Pkwy, Bothell, WA 98021, USA',
    geo: {
      latitude: 47.777901,
      longitude: -122.190565
    },
    placeId: 'ChIJk7ou2msOkFQRG1pKlmCuRpQ'
  }
]

exports.run = async () => {
  const response = await axios.get('http://www.muslimfeed.com/timesframe.aspx?mi=2043')
  const $ = cheerio.load(response.data)


  ids[0].fajrIqama = $('#trFajr > td:nth-child(3)').text().trim()
  ids[0].zuhrIqama = $('#trDhuhr > td:nth-child(3)').text().trim()
  ids[0].asrIqama = $('#trAsr > td:nth-child(3)').text().trim()
  ids[0].maghribIqama = $('#trMaghrib > td:nth-child(3)').text().trim()
  ids[0].ishaIqama = $('#trIsha > td:nth-child(3)').text().trim()
  ids[0].juma1 = $('#tblDailyTimes > tbody > tr:nth-child(9) > td:nth-child(2)').text().trim()
  ids[0].juma2 = 'check website'

  return ids
}
exports.ids = ids
