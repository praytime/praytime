exports.apifySettings = {
  startUrls: [ { 'value': 'http://thfoundation.org' } ],
  pageFunction: function pageFunction (context) {
    var date = new Date()
    var $ = context.jQuery
    var result = {
      results: [
        {
          uuid4: 'a988f430-650d-4918-800d-21be23ca34a1',
          crawlTime: date,
          name: 'Islamic Center of Romeoville',
          url: 'http://thfoundation.com',
          address: '14455 S Budler Rd, Plainfield, IL 60544, USA',
          timeZoneId: 'America/Chicago',
          placeId: 'ChIJ2eKwWJlfDogRss6NduNi-TM',
          geo: {
            latitude: 41.620172,
            longitude: -88.153147
          },
          fajrIqama: $('body > div.container-fluid.grey > div > div.col-md-3 > table > tbody > tr:nth-child(3) > td:nth-child(2)').first().text().trim(),
          zuhrIqama: $('body > div.container-fluid.grey > div > div.col-md-3 > table > tbody > tr:nth-child(4) > td:nth-child(2)').first().text().trim(),
          asrIqama: $('body > div.container-fluid.grey > div > div.col-md-3 > table > tbody > tr:nth-child(5) > td:nth-child(2)').first().text().trim(),
          maghribIqama: $('body > div.container-fluid.grey > div > div.col-md-3 > table > tbody > tr:nth-child(6) > td:nth-child(2)').first().text().trim(),
          ishaIqama: $('body > div.container-fluid.grey > div > div.col-md-3 > table > tbody > tr:nth-child(7) > td:nth-child(2)').first().text().trim(),
          juma1: $('body > div.container-fluid.grey > div > div.col-md-3 > table > tbody > tr:nth-child(8) > th').first().text().trim()
        }
      ]
    }
    return result
  }.toString()
}
