const axios = require('axios')
const cheerio = require('cheerio')

const ids = [
  {
    uuid4: '6515de3b-bbda-49aa-97bd-6962072a9880',
    name: 'Dar Al-Hijrah',
    url: 'https://hijrah.org/',
    address: '3159 Row St, Falls Church, VA 22044, USA',
    timeZoneId: 'America/New_York',
    placeId: 'ChIJKZHrdH60t4kRDYVdiyL8Gps',
    geo: {
      latitude: 38.861948,
      longitude: -77.14697
    }
  },
  {
    uuid4: 'ddafbb69-e03a-425d-a687-4d2be43173eb',
    name: 'MAS Community Center',
    url: 'https://hijrah.org/',
    address: '6408 Edsall Rd, Alexandria, VA 22312, USA',
    timeZoneId: 'America/New_York',
    placeId: 'ChIJl2nIW_Cyt4kRQHNIy86vKnc',
    geo: {
      latitude: 38.80509,
      longitude: -77.15775
    }
  }
]

exports.run = async () => {
  const response = await axios.get('https://hijrah.org/')
  const $ = cheerio.load(response.data)
  const j = $('#text-2 > div.textwidget > center').text().match(/(\d{1,2}:\d{1,2})/g)

  // Alternative method: use filter to do a regex match on contents
  //
  // ids[0].zuhrIqama =
  //   $('td:last-child',                    // 3. Use matched row as context, select last <td> in the row
  //                                         //    See: https://github.com/cheeriojs/cheerio#-selector-context-root-
  //     $('.dptTimetable tr')               // 1. start with <tr>s under .dptTimetable
  //       .filter((i, e) =>                 //    fat arrow notation for brevity, see https://stackoverflow.com/a/58546095
  //         /Jumuah|Zuhr/.test($(e).text()) // 2. filter out those that don't contain "Jumuah" or "Zuhr"
  //                                         //    Using inline regex notation, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
  //       )
  //   ).text()                              // 4. return text

  ids[0].fajrIqama = $('.dptTimetable tr:nth-child(3) td:last-child').text()
  ids[0].zuhrIqama = $('.dptTimetable tr:nth-child(5) td:last-child').text()
  ids[0].asrIqama = $('.dptTimetable tr:nth-child(6) td:last-child').text()
  ids[0].maghribIqama = $('.dptTimetable tr:nth-child(7) td:last-child').text()
  ids[0].ishaIqama = $('.dptTimetable tr:nth-child(8) td:last-child').text()
  ids[0].juma1 = j[0]
  ids[0].juma2 = j[1]
  ids[0].juma3 = j[2]

  ids[1].juma1 = j[3]
  ids[1].juma2 = j[4]

  return ids
}
exports.ids = ids
