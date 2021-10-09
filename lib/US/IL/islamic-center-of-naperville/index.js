const util = require('../../../util')

const ids = [
  {
    uuid4: 'd7c67298-6f4b-4694-a157-1ece31bc3294',
    name: 'Islamic Center of Naperville (Ogden)',
    url: 'http://islamiccenterofnaperville.org',
    address: '2844 West Ogden Ave, Naperville IL, 60540, USA',
    timeZoneId: 'America/Chicago',
    placeId: 'ChIJnw5viS74DogRlFBTHUQ89Dk',
    geo: {
      latitude: 41.753933,
      longitude: -88.201616
    }
  },
  {
    uuid4: 'fefae38d-2e93-48fc-8bc2-6cb6f93a964e',
    name: 'Islamic Center of Naperville (Olesen)',
    url: 'http://islamiccenterofnaperville.org',
    address: '450 Olesen Dr, Naperville, IL 60540, USA',
    placeId: 'ChIJiYkXUXJXDogRpL27TOZv-ao',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 41.768289,
      longitude: -88.120149
    }
  },
  {
    uuid4: '68651d83-7b84-4440-902f-e43bc95c46c8',
    name: 'Islamic Center of Naperville (75th St)',
    url: 'http://islamiccenterofnaperville.org',
    timeZoneId: 'America/Chicago',
    address: '25W530 75th St, Naperville, IL 60565, USA',
    geo: {
      latitude: 41.749155,
      longitude: -88.121487
    },
    placeId: 'ChIJp4GFjXxXDogRXBXbY3b7ww0'
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  util.setTimes(ids[0], [
    $("td:contains('Fajr') ~ td").eq(0).text(),
    $("td:contains('Dhuhr') ~ td").eq(0).text(),
    $("td:contains('Asr') ~ td").eq(0).text(),
    $("td:contains('Maghrib') ~ td").eq(0).text(),
    $("td:contains('Isha') ~ td").eq(0).text(),
    $("td:contains('1st Khutbah') ~ td").eq(0).text(),
    $("td:contains('2nd Khutbah') ~ td").eq(0).text(),
    $("td:contains('3rd Khutbah') ~ td").eq(0).text()
  ])

  util.setTimes(ids[1], [
    $("td:contains('Fajr') ~ td").eq(1).text(),
    $("td:contains('Dhuhr') ~ td").eq(1).text(),
    $("td:contains('Asr') ~ td").eq(1).text(),
    $("td:contains('Maghrib') ~ td").eq(1).text(),
    $("td:contains('Isha') ~ td").eq(1).text(),
    $("td:contains('1st Khutbah') ~ td").eq(1).text()
  ])

  util.setTimes(ids[2], [
    $("td:contains('Fajr') ~ td").eq(2).text(),
    $("td:contains('Dhuhr') ~ td").eq(2).text(),
    $("td:contains('Asr') ~ td").eq(2).text(),
    $("td:contains('Maghrib') ~ td").eq(2).text(),
    $("td:contains('Isha') ~ td").eq(2).text(),
    $("td:contains('1st Khutbah') ~ td").eq(2).text(),
    $("td:contains('2nd Khutbah') ~ td").eq(2).text()
  ])

  return ids
}
exports.ids = ids
