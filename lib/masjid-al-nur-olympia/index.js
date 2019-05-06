const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '21000984-0003-4c25-abd2-00c4e9b883d6',
    name: 'Masjid Al-Nur',
    url: 'http://www.islamiccenterofolympia.org/',
    timeZoneId: 'America/Los_Angeles',
    address: '4324 20th Ln NE, Olympia, WA 98516, USA',
    geo: {
      latitude: 47.063416,
      longitude: -122.828343
    },
    placeId: 'ChIJWxjFAuIKkVQRURrYHHMkuXk'
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://www.islamiccenterofolympia.org/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $('td:contains(Fajr) + td').text().trim()
  results[0].zuhrIqama = $('td:contains(Dhuhr) + td').text().trim()
  results[0].asrIqama = $('td:contains(Asr) + td').text().trim()
  results[0].maghribIqama = $('td:contains(Magrib) + td').text().trim()
  results[0].ishaIqama = $('td:contains(Isha) + td').text().trim()
  results[0].juma1 = $('td:contains(Jummah) + td').text().trim()

  return results
}
