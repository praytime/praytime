exports.apifySettings = {
  startUrls: [ { 'value': 'http://www.emasseattle.org/' } ],
  pageFunction: function pageFunction (context) {
    const date = new Date()
    const startedAt = Date.now()
    const $ = context.jQuery
    const results = [
      {
        uuid4: '56694533-c7f4-450f-921f-ec50be11a691',
        crawlTime: date,
        name: 'Ethiopian Muslims Assocation of Seattle',
        url: 'http://www.emasseattle.org/',
        timeZoneId: 'America/Los_Angeles',
        address: '3730 S 166th St, SeaTac, WA 98188, USA',
        geo: {
          latitude: 47.455067,
          longitude: -122.284984
        },
        placeId: 'ChIJCeZl3UpDkFQRuLd31_Ik9z0'
      }
    ]

    const extractData = function () {
      // timeout after 15 seconds
      if ((Date.now() - startedAt) > 15000) {
        context.finish('Timed out')
        return
      }

      if (!$('#fajirIqamah').text()) {
        setTimeout(extractData, 500)
        return
      }

      results[0].fajrIqama = $('#fajirIqamah').text().trim()
      results[0].zuhrIqama = $('#duhurIqamah').text().trim()
      results[0].asrIqama = $('#asrIqamah').text().trim()
      results[0].maghribIqama = $('#maghribIqamah').text().trim()
      results[0].ishaIqama = $('#ishaIqamah').text().trim()
      results[0].juma1 = $('td.prayer-header:contains(Jumu\'ah) + td').text().trim()
      context.finish({ results: results })
    }
    context.willFinishLater()
    extractData()
  }.toString()
}
