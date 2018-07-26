exports.apifySettings = {
  startUrls: [ { 'value': 'http://www.iieonline.org/' } ],
  pageFunction: function pageFunction (context) {
    const date = new Date()
    const $ = context.jQuery
    const result = {
      results: [
        {
          uuid4: 'a3f6b73c-6e49-4651-a95f-5af2d6ac8c09',
          crawlTime: date,
          name: 'Masjid Ul Islam',
          url: 'http://www.iieonline.org/',
          address: '1280 Bluff City Blvd, Elgin, IL 60120, USA',
          placeId: 'ChIJvTOnbYQGD4gRP4Y3OQWN74I',
          timeZoneId: 'America/Chicago',
          geo: {
            latitude: 42.018804,
            longitude: -88.240546
          },
          fajrIqama: $('#jamaat > ul > li:nth-child(1) > span').text().trim(),
          zuhrIqama: $('#jamaat > ul > li:nth-child(2) > span').text().trim(),
          asrIqama: $('#jamaat > ul > li:nth-child(3) > span').text().trim(),
          maghribIqama: $('#jamaat > ul > li:nth-child(4) > span').text().trim(),
          ishaIqama: $('#jamaat > ul > li:nth-child(5) > span').text().trim(),
          juma1: $('#jamaat > ul > li:nth-child(6) > span').text().trim()
        }
      ]
    }
    return result
  }.toString()
}
