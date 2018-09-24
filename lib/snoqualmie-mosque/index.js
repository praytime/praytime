// const axios = require('axios')
// const cheerio = require('cheerio')

exports.results = [
  {
    uuid4: 'a6a5a3c6-dc9d-438b-9f0e-7e8105660cd0',
    name: 'Snoqualmie Mosque',
    url: 'http://www.snoqualmiemosque.org',
    timeZoneId: 'America/Los_Angeles',
    crawlTime: new Date(),
    address: '35324 SE Center St g, Snoqualmie, WA 98065, USA',
    geo: {
      latitude: 47.527982,
      longitude: -121.868874
    },
    placeId: 'ChIJlZrTvKV7kFQRA9FbhOH3jcw'
  }
]

// TODO - apify look for style: white
// exports.run = async () => {
//   const date = new Date()
//   const response = await axios.get('http://www.snoqualmiemosque.org/prayers.html')
//   const $ = cheerio.load(response.data)
//
//   results[0].crawlTime = date
//
//   results[0].fajrIqama = $('#trFajr > td:nth-child(3)').text().trim()
//   results[0].zuhrIqama = $('#trDhuhr > td:nth-child(3)').text().trim()
//   results[0].asrIqama = $('#trAsr > td:nth-child(3)').text().trim()
//   results[0].maghribIqama = $('#trMaghrib > td:nth-child(3)').text().trim()
//   results[0].ishaIqama = $('#trIsha > td:nth-child(3)').text().trim()
//   results[0].juma1 = $('#tblDailyTimes > tbody > tr:nth-child(9) > td:nth-child(2)').text().trim()
//
//   return results
// }
