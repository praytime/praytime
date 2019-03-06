exports.apifySettings = {
  startUrls: [ { 'value': 'http://meccacenter.org' } ],
  pageFunction: function pageFunction (context) {
    var date = new Date()
    var $ = context.jQuery
    var result = {
      results: [
        {
          uuid4: '12274a9a-4d61-4239-ba86-1c46bd12dc19',
          crawlTime: date,
          name: 'MECCA Center',
          url: 'http://meccacenter.org',
          address: '16W560 91st Street, Willowbrook, IL 60527, USA',
          placeId: 'ChIJuwioielFDogRbf6JF65FuZk',
          timeZoneId: 'America/Chicago',
          geo: {
            latitude: 41.724164,
            longitude: -87.948055
          },
          fajrIqama: $('th.prayerName:contains("Fajr") ~ td').eq(-1).text().trim(),
          zuhrIqama: $('th.prayerName:contains("Zuhr") ~ td').eq(-1).text().trim(),
          asrIqama: $('th.prayerName:contains("Asr") ~ td').eq(-1).text().trim(),
          maghribIqama: $('th.prayerName:contains("Maghrib") ~ td').eq(-1).text().trim(),
          ishaIqama: $('th.prayerName:contains("Isha") ~ td').eq(-1).text().trim(),
          juma1: 'check website'
        }
      ]
    }
    return result
  }.toString()
}
