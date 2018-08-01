/* prayer times inside an iframe. iframe renders prayer times with javascript. use jQuery to get iframe element, then .contents() to traverse its contents. */
exports.apifySettings = {
  startUrls: [ { 'value': 'http://www.isdonline.org' } ],
  pageFunction: function pageFunction (context) {
    const $ = context.jQuery
    const startedAt = Date.now()
    return {
      results: [
        {
          crawlTime: startedAt,
          uuid4: 'a5d9ddbe-664f-4064-80c3-3cb07f7335b7',
          name: 'Islamic Society of Delaware',
          url: 'http://www.isdonline.org/',
          address: '2934, 28 Salem Church Rd, Newark, DE 19713, United States',
          timeZoneId: 'America/New_York',
          placeId: 'ChIJ_T8wFroAx4kRrT4wHeUO1rk',
          geo: {
            latitude: 39.675908,
            longitude: -75.696218
          },
          fajrIqama: $('#rightcolumn > div:nth-child(1) > #prayertimes > iframe').contents().find('body > center > font > table > tbody > tr:nth-child(2) > td:nth-child(2)').text(),
          zuhrIqama: $('#rightcolumn > div:nth-child(1) > #prayertimes > iframe').contents().find('body > center > font > table > tbody > tr:nth-child(4) > td:nth-child(2)').text().trim(),
          asrIqama: $('#rightcolumn > div:nth-child(1) > #prayertimes > iframe').contents().find('body > center > font > table > tbody > tr:nth-child(6) > td:nth-child(2)').text().trim(),
          maghribIqama: $('#rightcolumn > div:nth-child(1) > #prayertimes > iframe').contents().find('body > center > font > table > tbody > tr:nth-child(7) > td:nth-child(2)').text().trim(),
          ishaIqama: $('#rightcolumn > div:nth-child(1) > #prayertimes > iframe').contents().find('body > center > font > table > tbody > tr:nth-child(8) > td:nth-child(2)').text().trim(),
          juma1: $('#fridaytimes > iframe').contents().find('body > p:nth-child(2) > font > table > tbody > tr:nth-child(2) > td:nth-child(2)').text().trim(),
          juma2: $('#fridaytimes > iframe').contents().find('body > p:nth-child(2) > font > table > tbody > tr:nth-child(6) > td:nth-child(2)').text().trim()
        }
      ]
    }
  }.toString()
}
