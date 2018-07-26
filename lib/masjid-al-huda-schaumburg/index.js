exports.apifySettings = {
  startUrls: [ { 'value': 'http://masjidalhuda.org/' } ],
  pageFunction: function pageFunction (context) {
    const date = new Date()
    const $ = context.jQuery
    const startedAt = Date.now()
    const element = '#prayertimegrid1'

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
            uuid4: '2b591b0a-6808-459b-8998-7e74f0251898',
            crawlTime: date,
            name: 'Masjid Al Huda',
            url: 'http://masjidalhuda.org/',
            address: '1081 Irving Park Rd, Schaumburg, IL 60193, USA',
            placeId: 'ChIJfXzPEG6pD4gRv_p7cMLrda8',
            timeZoneId: 'America/Chicago',
            geo: {
              latitude: 41.997743,
              longitude: -88.118683
            },
            fajrIqama: $('#prayertimegrid1 > tbody > tr.active > td:nth-child(2) > h4 > span').text().trim(),
            zuhrIqama: $('#prayertimegrid1 > tbody > tr.active > td:nth-child(4) > h4 > span').text().trim(),
            asrIqama: $('#prayertimegrid1 > tbody > tr.active > td:nth-child(5) > h4 > span').text().trim(),
            maghribIqama: $('#prayertimegrid1 > tbody > tr.active > td:nth-child(6) > h4 > span').text().trim(),
            ishaIqama: $('#prayertimegrid1 > tbody > tr.active > td:nth-child(7) > h4 > span').text().trim(),
            juma1: $('#prayertimegrid1 > tbody > tr:nth-child(1) > td:nth-child(8) > h4 > span').text().trim(),
            juma2: $('#prayertimegrid1 > tbody > tr:nth-child(1) > td:nth-child(9) > h4 > span').text().trim()
          }
        ]
      })
    }

    // tell the crawler that pageFunction will finish asynchronously
    context.willFinishLater()
    extractData()
  }.toString()
}
