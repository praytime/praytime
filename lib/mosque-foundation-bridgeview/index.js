exports.apifySettings = {
  _id: 'bBG5kmupgKJPssdeh',
  startUrls: [ { 'value': 'http://www.mosquefoundation.org/' } ],
  pageFunction: function pageFunction (context) {
    const date = new Date()
    const $ = context.jQuery
    const result = {
      results: [
        {
          uuid4: '613f529b-690a-4ddb-99b4-2ddbd5121e70',
          crawlTime: date,
          name: 'Mosque Foundation',
          url: 'http://www.mosquefoundation.org/',
          address: '7360 W 93rd St, Bridgeview, IL 60455, USA',
          placeId: 'ChIJvbna_MY5DogRXE_OTtsvkLs',
          timeZoneId: 'America/Chicago',
          geo: {
            latitude: 41.722827,
            longitude: -87.802968
          },
          fajrIqama: $('#timetable > tbody > tr:nth-child(4) > td.iqama-time').text().trim(),
          zuhrIqama: $('#timetable > tbody > tr:nth-child(6) > td.iqama-time').text().trim(),
          asrIqama: $('#timetable > tbody > tr:nth-child(7) > td.iqama-time').text().trim(),
          maghribIqama: $('#timetable > tbody > tr:nth-child(8) > td.iqama-time').text().trim(),
          ishaIqama: $('#timetable > tbody > tr:nth-child(9) > td.iqama-time').text().trim(),
          juma1: $('#timetable > tbody > tr:nth-child(10) > td:nth-child(2)').text().trim(),
          juma2: $('#timetable > tbody > tr:nth-child(11) > td:nth-child(2)').text().trim()
        }
      ]
    }
    return result
  }.toString()
}
