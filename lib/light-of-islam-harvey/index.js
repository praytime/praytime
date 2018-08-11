const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '0f2d3588-0e34-4b08-be14-aa2afd926927',
    name: 'Light of Islam',
    url: 'http://lightofislammasjid.org/',
    address: '46 E 147th St, Harvey, IL 60426, USA',
    placeId: 'ChIJqZmyVakjDogR5h13FztqPP8',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 41.622404,
      longitude: -87.653373
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://lightofislammasjid.org/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $('#daily_salat_times > ul > table > tbody > tr:nth-child(3) > td:nth-child(2)').first().text().trim()
  results[0].zuhrIqama = $('#daily_salat_times > ul > table > tbody > tr:nth-child(5) > td:nth-child(2)').text().trim()
  results[0].asrIqama = $('#daily_salat_times > ul > table > tbody > tr:nth-child(6) > td:nth-child(2)').text().trim()
  results[0].maghribIqama = $('#daily_salat_times > ul > table > tbody > tr:nth-child(7) > td:nth-child(2)').text().trim()
  results[0].ishaIqama = $('#daily_salat_times > ul > table > tbody > tr:nth-child(8) > td:nth-child(2)').text().trim()
  results[0].juma1 = $('#daily_salat_times > h3').text().match(/\d{1,2}:\d{1,2}/)[0]

  return results
}
