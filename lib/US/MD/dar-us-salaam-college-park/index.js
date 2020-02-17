const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '67c64bec-d370-48ec-8c01-78f3d7cc2494',
    name: 'Dar-us-Salaam',
    url: 'https://darussalaam.org/',
    address: '5301 Edgewood Rd, College Park, MD 20740, USA',
    placeId: 'ChIJZXrLS_PDt4kRFnzV6QTr4rQ',
    timeZoneId: 'America/New_York',
    geo: {
      latitude: 39.015049,
      longitude: -76.911195
    }
  },
  {
    uuid4: '40b30d95-f3b7-4a36-bc71-5bc57329120f',
    name: 'Dar-us-Salaam - Off Site Juma',
    url: 'https://darussalaam.org/',
    address: '9450 Cherry Hill Rd, College Park, MD 20740, USA',
    placeId: 'ChIJBZgZgmrEt4kRPtq--ArcS5s',
    timeZoneId: 'America/New_York',
    geo: {
      latitude: 39.020607,
      longitude: -76.94011
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://darussalaam.org/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date
  results[1].crawlTime = date

  const p = $('table.dptTimetable td.jamah')

  results[0].fajrIqama = p.eq(0).text().trim()
  results[0].zuhrIqama = p.eq(1).text().trim()
  results[0].asrIqama = p.eq(2).text().trim()
  results[0].maghribIqama = p.eq(3).text().trim()
  results[0].ishaIqama = p.eq(4).text().trim()
  results[0].juma1 = p.eq(5).text().trim()

  results[1].juma1 = 'check website'

  return results
}
