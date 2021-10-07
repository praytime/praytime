const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '7bc0c531-73b4-49ae-a25b-d7525f3a6104',
    name: 'Fox Valley Muslim Community Center',
    url: 'https://www.auroramasjid.org/',
    address: '1187 Timberlake Dr, Aurora, IL 60506, USA',
    placeId: 'ChIJpyouLQXlDogRbZ1oyLj1418',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 41.780753,
      longitude: -88.353097
    }
  }
]

exports.run = async () => {
  const response = await axios.get('https://www.auroramasjid.org/')
  const $ = cheerio.load(response.data)


  const text = $('h2:contains("Fajr")').text();
  //EX:
  //Fajr:         6:00
  //Duhr:       1:30
  //Asr:          5:15
  //Maghrib: Sunset
  //Isha:         8:30
  //Jumah:    1:15

  results[0].fajrIqama = text.match(/Fajr\s*:\s*(\S+)/)[1]
  results[0].zuhrIqama = text.match(/Duhr\s*:\s*(\S+)/)[1]
  results[0].asrIqama = text.match(/Asr\s*:\s*(\S+)/)[1]
  results[0].maghribIqama = text.match(/Maghrib\s*:\s*(\S+)/)[1]
  results[0].ishaIqama = text.match(/Isha\s*:\s*(\S+)/)[1]
  results[0].juma1 = text.match(/Jumah\s*:\s*(\S+)/)[1]

  return results
}
