exports.apifySettings = {
  _id: 'bBG5kmupgKJPssdeh',
  startUrls: [ { 'value': 'http://www.accplainfield.org/' } ],
  pageFunction: function pageFunction (context) {
    const date = new Date()
    const $ = context.jQuery
    const result = {
      results: [
        {
          uuid4: 'a29de6c9-b35b-4c29-956d-f0eda7338c61',
          crawlTime: date,
          name: 'Al-Aqsa Community Center',
          url: 'http://www.accplainfield.org/',
          address: '17940 Bronk Rd, Plainfield, IL 60586, USA',
          placeId: 'ChIJu0A5cfKKDogRwwN7sNgCylw',
          timeZoneId: 'America/Chicago',
          geo: {
            latitude: 41.556664,
            longitude: -88.19109
          },
          fajrIqama: $('#Table_01 > tbody > tr:nth-child(1) > td:nth-child(2)').text().trim(),
          zuhrIqama: $('#Table_01 > tbody > tr:nth-child(2) > td:nth-child(2)').text().trim(),
          asrIqama: $('#Table_01 > tbody > tr:nth-child(3) > td:nth-child(2)').text().trim(),
          maghribIqama: $('#Table_01 > tbody > tr:nth-child(4) > td:nth-child(2)').text().trim(),
          ishaIqama: $('#Table_01 > tbody > tr:nth-child(5) > td:nth-child(2)').text().trim(),
          juma1: $('#Table_01 > tbody > tr:nth-child(6) > td:nth-child(2)').text().trim()
        }
      ]
    }
    return result
  }.toString()
}
