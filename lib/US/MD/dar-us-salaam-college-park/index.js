const axios = require('axios')
const cheerio = require('cheerio')

const ids = [
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
  const response = await axios.get('https://darussalaam.org/')
  const $ = cheerio.load(response.data)


  ids[0].fajrIqama = $('.dptTimetable tr:nth-child(3) td:last-child').text()
  ids[0].zuhrIqama = $('.dptTimetable tr:nth-child(5) td:last-child').text()
  ids[0].asrIqama = $('.dptTimetable tr:nth-child(6) td:last-child').text()
  ids[0].maghribIqama = $('.dptTimetable tr:nth-child(7) td:last-child').text()
  ids[0].ishaIqama = $('.dptTimetable tr:nth-child(8) td:last-child').text()
  ids[0].juma1 = 'check website'

  ids[1].juma1 = 'check website'

  return ids
}
