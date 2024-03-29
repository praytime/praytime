const axios = require('axios')
const cheerio = require('cheerio')

const ids = [
  {
    uuid4: '5f1bdbb0-bb66-416b-b9ab-dc21242b8cf1',
    name: 'Chicago Mosque',
    url: 'http://chicagomosque.org/',
    address: '6201 W Peterson Ave, Chicago, IL 60646, USA',
    placeId: 'ChIJyRnwWE7JD4gRcBUTeEOPZRo',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 41.989844,
      longitude: -87.782923
    }
  }
]

exports.run = async () => {
  const response = await axios.get('http://chicagomosque.org/')
  const $ = cheerio.load(response.data)

  ids[0].fajrIqama = $('#ctl00_ModulePanel > div:nth-child(1) > div:nth-child(3) > div:nth-child(3)').text().trim()
  ids[0].zuhrIqama = $('#ctl00_ModulePanel > div:nth-child(1) > div:nth-child(4) > div:nth-child(3)').text().trim()
  ids[0].asrIqama = $('#ctl00_ModulePanel > div:nth-child(1) > div:nth-child(5) > div:nth-child(3)').text().trim()
  ids[0].maghribIqama = $('#ctl00_ModulePanel > div:nth-child(1) > div:nth-child(6) > div:nth-child(3)').text().trim()
  ids[0].ishaIqama = $('#ctl00_ModulePanel > div:nth-child(1) > div:nth-child(7) > div:nth-child(3)').text().trim()
  ids[0].juma1 = 'check website'

  return ids
}

// exports.apifySettings = {
//   startUrls: [ { 'value': 'http://chicagomosque.org/' } ],
//   pageFunction: function pageFunction (context) {
//     const $ = context.jQuery
//     const result = {
//       ids: [
//         {
//           fajrIqama: $('#ctl00_ModulePanel > div:nth-child(1) > div:nth-child(3) > div:nth-child(3)').text().trim(),
//           zuhrIqama: $('#ctl00_ModulePanel > div:nth-child(1) > div:nth-child(4) > div:nth-child(3)').text().trim(),
//           asrIqama: $('#ctl00_ModulePanel > div:nth-child(1) > div:nth-child(5) > div:nth-child(3)').text().trim(),
//           maghribIqama: $('#ctl00_ModulePanel > div:nth-child(1) > div:nth-child(6) > div:nth-child(3)').text().trim(),
//           ishaIqama: $('#ctl00_ModulePanel > div:nth-child(1) > div:nth-child(7) > div:nth-child(3)').text().trim(),
//           juma1: 'check website'
//         }
//       ]
//     }
//     return result
//   }.toString()
// }
exports.ids = ids
