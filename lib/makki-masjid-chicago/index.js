exports.apifySettings = {
  startUrls: [ { 'value': 'https://makkimasjid.com/' } ],
  pageFunction: function pageFunction (context) {
    const date = new Date()
    const $ = context.jQuery
    const result = {
      results: [
        {
          uuid4: 'b2bb6aa2-dc2b-433c-a490-6c444a2dc36b',
          crawlTime: date,
          name: 'Makki Masjid',
          url: 'https://makkimasjid.com/#',
          address: '3418 W Ainslie St, Chicago, IL 60625, USA',
          placeId: 'ChIJf2or3ebND4gR6xnJDpsS1QU',
          timeZoneId: 'America/Chicago',
          geo: {
            latitude: 41.970328,
            longitude: -87.714355
          },
          fajrIqama: $('#fajr-iq').text().trim(),
          zuhrIqama: $('#zuhr-iq').text().trim(),
          asrIqama: $('#asr-iq').text().trim(),
          maghribIqama: $('#magh-iq').text().trim(),
          ishaIqama: $('#isha-iq').text().trim(),
          juma1: $('#jumm').text().trim()
        }
      ]
    }
    return result
  }.toString()
}
