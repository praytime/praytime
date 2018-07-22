exports.apifySettings = {
  _id: 'bBG5kmupgKJPssdeh',
  startUrls: [ { 'value': 'http://islamiccenterofnaperville.org/' } ],
  pageFunction: function pageFunction (context) {
    var date = new Date()
    var $ = context.jQuery
    var fi = $("td:contains('Fajr')").first().next('td').text()
    var foi = $("td:contains('Fajr at Olesen')").first().next('td').text()
    var zi = $("td:contains('Dhuhr') + td").text()
    var ai = $("td:contains('Asr') + td").text()
    var mi = $("td:contains('Maghrib') + td").text()
    var ii = $("td:contains('Isha') + td").text()
    var j1 = $("td:contains('1st Khutbah') + td").text()
    var j2 = $("td:contains('2nd Khutbah') + td").text()

    var result = {
      results: [
        {
          uuid4: 'd7c67298-6f4b-4694-a157-1ece31bc3294',
          crawlTime: date,
          name: 'Islamic Center of Naperville',
          url: 'https://islamiccenterofnaperville.org',
          address: '2844 West Ogden Ave, Naperville IL, 60540, USA',
          timeZoneId: 'America/Chicago',
          placeId: 'ChIJnw5viS74DogRlFBTHUQ89Dk',
          geo: {
            latitude: 41.753933,
            longitude: -88.201616
          },
          fajrIqama: fi,
          zuhrIqama: zi,
          asrIqama: ai,
          maghribIqama: mi,
          ishaIqama: ii,
          juma1: j1,
          juma2: j2
        },
        {
          uuid4: 'fefae38d-2e93-48fc-8bc2-6cb6f93a964e',
          crawlTime: date,
          name: 'ICN Al-Hidayah',
          url: 'https://islamiccenterofnaperville.org',
          address: '450 Olesen Dr, Naperville, IL 60540, USA',
          placeId: 'ChIJiYkXUXJXDogRpL27TOZv-ao',
          timeZoneId: 'America/Chicago',
          geo: {
            latitude: 41.768289,
            longitude: -88.120149
          },
          fajrIqama: foi,
          zuhrIqama: zi,
          asrIqama: ai,
          maghribIqama: mi,
          ishaIqama: ii,
          juma1: j1,
          juma2: j2
        }
      ]
    }
    return result
  }.toString()
}
