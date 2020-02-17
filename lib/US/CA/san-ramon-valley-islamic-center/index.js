exports.apifySettings = {
  startUrls: [ { 'value': 'http://www.srvic.org/' } ],
  pageFunction: function pageFunction (context) {
    const date = new Date()
    const $ = context.jQuery
    return {
      results: [
        {
          uuid4: '06d76993-f828-4543-a45a-c6a5acc02641',
          crawlTime: date,
          name: 'San Ramon Valley Islamic Center',
          url: 'http://www.srvic.org/',
          address: '2232 Camino Ramon, San Ramon, CA 94583, USA',
          placeId: 'ChIJgZMAveryj4ARu8cHwsFnX0E',
          timeZoneId: 'America/Los_Angeles',
          geo: {
            latitude: 37.776787,
            longitude: -121.969178
          },

          fajrIqama: $("td:contains('Fajr') ~ td").eq(-1).text(),
          zuhrIqama: $("td:contains('Dhuhur') ~ td").eq(-1).text(),
          asrIqama: $("td:contains('Asr') ~ td").eq(-1).text(),
          maghribIqama: $("td:contains('Maghrib') ~ td").eq(-1).text(),
          ishaIqama: $("td:contains('Isha') ~ td").eq(-1).text(),
          juma1: 'check website'
        }
      ]
    }
  }.toString()
}
