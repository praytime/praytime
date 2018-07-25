exports.apifySettings = {
  _id: 'bBG5kmupgKJPssdeh',
  startUrls: [ { 'value': 'http://portal.masjidapps.com/public/readOnlySalahTimes?id=NQ2&code=OTFiNTY3ZmYtMDI5Yi00ZTJlLTlmYmItNWVlNWM5ZDc5Njkz0' } ],
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
            uuid4: '634b264a-a2df-4335-81ba-85d65310157a',
            crawlTime: date,
            name: 'The Prayer Center of Orland Park',
            url: 'http://orlandparkprayercenter.org/',
            address: '16530 104th Ave, Orland Park, IL 60467, USA',
            placeId: 'ChIJL23rVRhADogRoaVVq7Rp30o',
            timeZoneId: 'America/Chicago',
            geo: {
              latitude: 41.589576,
              longitude: -87.872386
            },
            fajrIqama: $('#mma-salahTimesContainer > table > tbody > tr:nth-child(1) > td:nth-child(3)').text().trim(),
            zuhrIqama: $('#mma-salahTimesContainer > table > tbody > tr:nth-child(3) > td:nth-child(3)').text().trim(),
            asrIqama: $('#mma-salahTimesContainer > table > tbody > tr:nth-child(4) > td:nth-child(3)').text().trim(),
            maghribIqama: $('#mma-salahTimesContainer > table > tbody > tr:nth-child(5) > td:nth-child(3)').text().trim(),
            ishaIqama: $('#mma-salahTimesContainer > table > tbody > tr:nth-child(6) > td:nth-child(3)').text().trim(),
            juma1: $('#mma-salahTimesContainer > table > tbody > tr:nth-child(7) > td:nth-child(2)').text().trim()
          }
        ]
      })
    }

    // tell the crawler that pageFunction will finish asynchronously
    context.willFinishLater()
    extractData()
  }.toString()
}
