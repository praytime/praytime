const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '634b264a-a2df-4335-81ba-85d65310157a',
    name: 'The Prayer Center of Orland Park',
    url: 'http://orlandparkprayercenter.org/',
    address: '16530 104th Ave, Orland Park, IL 60467, USA',
    placeId: 'ChIJL23rVRhADogRoaVVq7Rp30o',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 41.589576,
      longitude: -87.872386
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://orlandparkprayercenter.org/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $('.dptTimetable tr:nth-child(4) td').eq(0).text()
  results[0].zuhrIqama = $('.dptTimetable tr:nth-child(6) td').eq(0).text()
  results[0].asrIqama = $('.dptTimetable tr:nth-child(7) td').eq(0).text()
  results[0].maghribIqama = $('.dptTimetable tr:nth-child(8) td').eq(0).text()
  results[0].ishaIqama = $('.dptTimetable tr:nth-child(9) td').eq(0).text()
  results[0].juma1 = $('table.dptTimetable th').eq(0).text().match(/\d{1,2}:\d{2}/g)[0]
  results[0].juma2 = $('table.dptTimetable th').eq(0).text().match(/\d{1,2}:\d{2}/g)[1]

  return results
}
