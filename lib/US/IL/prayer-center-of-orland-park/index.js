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

  const p = $('table.dptTimetable td.begins')

  results[0].fajrIqama = p.eq(0).text().trim()
  results[0].zuhrIqama = p.eq(1).text().trim()
  results[0].asrIqama = p.eq(2).text().trim()
  results[0].maghribIqama = p.eq(3).text().trim()
  results[0].ishaIqama = p.eq(4).text().trim()
  results[0].juma1 = 'check website'
  results[0].juma2 = 'check website'

  return results
}
