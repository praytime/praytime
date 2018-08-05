const axios = require('axios')
const cheerio = require('cheerio')

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://mcceastbay.org/')
  const $ = cheerio.load(response.data)

  return [
    {
      uuid4: '804b9404-fd76-4eaa-8bcf-547c3cf084ef',
      crawlTime: date,
      name: 'Muslim Community Center – East Bay',
      url: 'https://mcceastbay.org/',
      address: '5724 W Las Positas Blvd #300, Pleasanton, CA 94588, USA',
      placeId: 'ChIJ2Xg1Sl3pj4ARyTAXb2SKLOk',
      timeZoneId: 'America/Los_Angeles',
      geo: {
        latitude: 37.685514,
        longitude: -121.891138
      },
      fajrIqama: $('table.dptTimetable > tbody > tr:nth-child(3) > td.jamah').text().trim(),
      zuhrIqama: $('table.dptTimetable > tbody > tr:nth-child(5) > td.jamah').text().trim(),
      asrIqama: $('table.dptTimetable > tbody > tr:nth-child(6) > td.jamah').text().trim(),
      maghribIqama: $('table.dptTimetable > tbody > tr:nth-child(7) > td.jamah').text().trim(),
      ishaIqama: $('table.dptTimetable > tbody > tr:nth-child(8) > td.jamah').text().trim(),
      juma1: $("div.table-1 > table > tbody > tr > td:contains('First')").text().match(/\d{1,2}:\d{1,2}/)[0],
      juma2: $("div.table-1 > table > tbody > tr > td:contains('Second')").text().match(/\d{1,2}:\d{1,2}/)[0]
    }
  ]
}
