const axios = require('axios')
const cheerio = require('cheerio')

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://islamiccenterofnaperville.org/')
  const $ = cheerio.load(response.data)
  return [
    {
      uuid4: 'd7c67298-6f4b-4694-a157-1ece31bc3294',
      crawlTime: date,
      name: 'Islamic Center of Naperville (Ogden)',
      url: 'http://islamiccenterofnaperville.org',
      address: '2844 West Ogden Ave, Naperville IL, 60540, USA',
      timeZoneId: 'America/Chicago',
      placeId: 'ChIJnw5viS74DogRlFBTHUQ89Dk',
      geo: {
        latitude: 41.753933,
        longitude: -88.201616
      },
      fajrIqama: $("td:contains('Fajr')").first().next('td').text(),
      zuhrIqama: $("td:contains('Dhuhr') + td").text(),
      asrIqama: $("td:contains('Asr') + td").text(),
      maghribIqama: $("td:contains('Maghrib') + td").text(),
      ishaIqama: $("td:contains('Isha') + td").text(),
      juma1: $("td:contains('1st Khutbah') + td").text(),
      juma2: $("td:contains('2nd Khutbah') + td").text()
    },
    {
      uuid4: 'fefae38d-2e93-48fc-8bc2-6cb6f93a964e',
      crawlTime: date,
      name: 'Islamic Center of Naperville (Olesen)',
      url: 'http://islamiccenterofnaperville.org',
      address: '450 Olesen Dr, Naperville, IL 60540, USA',
      placeId: 'ChIJiYkXUXJXDogRpL27TOZv-ao',
      timeZoneId: 'America/Chicago',
      geo: {
        latitude: 41.768289,
        longitude: -88.120149
      },
      fajrIqama: $("td:contains('Fajr at Olesen')").first().next('td').text(),
      zuhrIqama: $("td:contains('Dhuhr') + td").text(),
      asrIqama: $("td:contains('Asr') + td").text(),
      maghribIqama: $("td:contains('Maghrib') + td").text(),
      ishaIqama: $("td:contains('Isha') + td").text(),
      juma1: $("td:contains('1st Khutbah') + td").text(),
      juma2: $("td:contains('2nd Khutbah') + td").text()
    },
    {
      uuid4: '68651d83-7b84-4440-902f-e43bc95c46c8',
      crawlTime: date,
      name: 'Islamic Center of Naperville (75th St)',
      url: 'http://islamiccenterofnaperville.org',
      timeZoneId: 'America/Chicago',
      address: '25W530 75th St, Naperville, IL 60565, USA',
      geo: {
        latitude: 41.749155,
        longitude: -88.121487
      },
      placeId: 'ChIJp4GFjXxXDogRXBXbY3b7ww0',
      fajrIqama: $("td:contains('Fajr')").first().next('td').text(),
      zuhrIqama: '1:15p',
      asrIqama: $("td:contains('Asr') + td").text(),
      maghribIqama: $("td:contains('Maghrib') + td").text(),
      ishaIqama: $("td:contains('Isha') + td").text(),
      juma1: 'No Juma at this location until renovations are complete'
    }
  ]
}
