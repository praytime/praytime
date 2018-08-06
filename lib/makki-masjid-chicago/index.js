// TODO: get 2nd juma times also
exports.apifySettings = {
  startUrls: [ { 'value': 'https://makkimasjid.com/' } ],
  pageFunction: function pageFunction (context) {
    const date = new Date()
    const startedAt = Date.now()
    const $ = context.jQuery
    const results = [
      {
        uuid4: 'b2bb6aa2-dc2b-433c-a490-6c444a2dc36b',
        crawlTime: date,
        name: 'Makki Masjid',
        url: 'https://makkimasjid.com',
        address: '3418 W Ainslie St, Chicago, IL 60625, USA',
        placeId: 'ChIJf2or3ebND4gR6xnJDpsS1QU',
        timeZoneId: 'America/Chicago',
        geo: {
          latitude: 41.970328,
          longitude: -87.714355
        }
      },
      {
        uuid4: 'b03ba861-7727-4099-b078-a4e9a089fce5',
        crawlTime: date,
        name: 'Makki Education Academy',
        url: 'https://makkimasjid.com/mea/',
        address: '4926 N Kimball Ave, Chicago, IL 60625, USA',
        placeId: 'ChIJKd69y-bND4gRhnBRKC-_1Gw',
        timeZoneId: 'America/Chicago',
        geo: {
          latitude: 41.97112,
          longitude: -87.713793
        }
      }
    ]

    const extractData = function () {
      // timeout after 15 seconds
      if ((Date.now() - startedAt) > 15000) {
        context.finish('Timed out')
        return
      }

      // if fajr adhan and iqama are the same, times have not been populated yet
      if ($('#fajr-iq').text() === $('#fajr-t').text()) {
        setTimeout(extractData, 500)
        return
      }

      results[0].fajrIqama = $('#fajr-iq').text().trim()
      results[0].zuhrIqama = $('#zuhr-iq').text().trim()
      results[0].asrIqama = $('#asr-iq').text().trim()
      results[0].maghribIqama = $('#magh-iq').text().trim()
      results[0].ishaIqama = $('#isha-iq').text().trim()
      results[0].juma1 = $('#jumm').text().trim()
      results[1].juma2 = $('div.jummah-label').eq(1).text().match(/\d{1,2}:\d{1,2}/)[0]
      context.finish({ results: results })
    }
    context.willFinishLater()
    extractData()
  }.toString()
}
