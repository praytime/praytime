exports.apifySettings = {
  startUrls: [ { 'value': 'http://portal.masjidapps.com/public/readOnlySalahTimes?id=MQ2&code=NzY1ZjcxZmQtZjE0NS00OGFjLTljYTgtMjBiYmRlYjdkZGRj0' } ],
  pageFunction: function pageFunction (context) {
    const date = new Date()
    const $ = context.jQuery
    const startedAt = Date.now()
    const element = '#mma-salahTimesContainer'

    const extractData = function () {
      // timeout after 10 seconds
      if ((Date.now() - startedAt) > 10000) {
        context.finish('Timed out')
        return
      }

      // if my element still hasn't been loaded, wait a little more
      if ($(element).length === 0) {
        setTimeout(extractData, 500)
        return
      }

      // refresh page screenshot and HTML for debugging
      // context.saveSnapshot()

      // save a result
      context.finish({
        results: [
          {
            uuid4: 'deb1ec47-1b30-44c2-b528-2fd703820abc',
            name: 'Valley Ranch Islamic Center',
            url: 'http://www.valleyranchmasjid.org/',
            timeZoneId: 'America/Chicago',
            address: '9940 Valley Ranch Pkwy W, Irving, TX 75063, USA',
            geo: {
              latitude: 32.939534,
              longitude: -96.953352
            },
            placeId: 'ChIJ7ffag_ooTIYRi_p4uRLcKBQ',
            crawlTime: date,
            fajrIqama: $('#mma-salahTimesContainer > table > tbody > tr:nth-child(1) > td:nth-child(3)').text().trim(),
            zuhrIqama: $('#mma-salahTimesContainer > table > tbody > tr:nth-child(3) > td:nth-child(3)').text().trim(),
            asrIqama: $('#mma-salahTimesContainer > table > tbody > tr:nth-child(4) > td:nth-child(3)').text().trim(),
            maghribIqama: $('#mma-salahTimesContainer > table > tbody > tr:nth-child(5) > td:nth-child(3)').text().trim(),
            ishaIqama: $('#mma-salahTimesContainer > table > tbody > tr:nth-child(6) > td:nth-child(3)').text().trim(),
            // juma1: $('#mma-salahTimesContainer > table > tbody > tr:nth-child(7) > td:nth-child(2)').text().trim(),
            // juma2: $('#mma-salahTimesContainer > table > tbody > tr:nth-child(9) > td:nth-child(2)').text().trim()
            juma1: 'check website',
            juma2: 'check website'
          }
        ]
      })
    }

    // tell the crawler that pageFunction will finish asynchronously
    context.willFinishLater()
    extractData()
  }.toString()
}
