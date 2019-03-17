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
      fajrIqama: $("td:contains('Fajr') ~ td").eq(0).text(),
      zuhrIqama: $("td:contains('Dhuhr') ~ td").eq(0).text(),
      asrIqama: $("td:contains('Asr') ~ td").eq(0).text(),
      maghribIqama: $("td:contains('Maghrib') ~ td").eq(0).text(),
      ishaIqama: $("td:contains('Isha') ~ td").eq(0).text(),
      juma1: $("td:contains('1st Khutbah') ~ td").eq(0).text(),
      juma2: $("td:contains('2nd Khutbah') ~ td").eq(0).text()
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
      fajrIqama: $("td:contains('Fajr') ~ td").eq(1).text(),
      zuhrIqama: $("td:contains('Dhuhr') ~ td").eq(1).text(),
      asrIqama: $("td:contains('Asr') ~ td").eq(1).text(),
      maghribIqama: $("td:contains('Maghrib') ~ td").eq(1).text(),
      ishaIqama: $("td:contains('Isha') ~ td").eq(1).text(),
      juma1: $("td:contains('1st Khutbah') ~ td").eq(1).text()
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
      fajrIqama: $("td:contains('Fajr') ~ td").eq(2).text(),
      zuhrIqama: $("td:contains('Dhuhr') ~ td").eq(2).text(),
      asrIqama: $("td:contains('Asr') ~ td").eq(2).text(),
      maghribIqama: $("td:contains('Maghrib') ~ td").eq(2).text(),
      ishaIqama: $("td:contains('Isha') ~ td").eq(2).text(),
      juma1: $("td:contains('2nd Khutbah') ~ td").eq(2).text()
    }
  ]
}
