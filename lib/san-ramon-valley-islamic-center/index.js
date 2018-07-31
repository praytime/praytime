const axios = require('axios')
const cheerio = require('cheerio')

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://www.srvic.org/')
  const $ = cheerio.load(response.data)

  return [
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
      fajrIqama: $('#pr-fajar > span:nth-child(3)').first().text().trim(),
      zuhrIqama: $('#pr-duhr > span:nth-child(3)').first().text().trim(),
      asrIqama: $('#pr-asar > span:nth-child(3)').first().text().trim(),
      maghribIqama: $('#pr-maghrib > span:nth-child(3)').first().text().trim(),
      ishaIqama: $('#pr-isha > span:nth-child(3)').first().text().trim(),
      juma1: $('ul.prayer-grey-bg > li:nth-child(7) > span:nth-child(2)').first().text().trim(),
      juma2: $('ul.prayer-grey-bg > li:nth-child(8) > span:nth-child(2)').first().text().trim()
    }
  ]
}
