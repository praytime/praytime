const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '2761a944-e1bc-4d85-8581-55a4d7536ce2',
    name: 'Madani Masjid',
    url: 'https://www.madanimasjid.org',
    address: '40 North Lincoln Street, Westmont, IL, 60559, USA',
    timeZoneId: 'America/Chicago',
    placeId: 'ChIJVVXlUllODogRulXf-qOuXyw',
    geo: {
      latitude: 41.797492,
      longitude: -87.977081
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://www.madanimasjid.org/prayer-times/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $('strong:contains(Fajr)').text().match(/\d{1,2}:\d{1,2}/)[0]
  results[0].zuhrIqama = $('strong:contains(Dhuhr)').text().match(/\d{1,2}:\d{1,2}/)[0]
  results[0].asrIqama = $('strong:contains(Asr)').text().match(/\d{1,2}:\d{1,2}/)[0]
  results[0].maghribIqama = $('strong:contains(Maghrib)').text().trim()
  results[0].ishaIqama = $('strong:contains(Isha)').text().match(/\d{1,2}:\d{1,2}/)[0]
  results[0].juma1 = 'check website'

  return results
}
