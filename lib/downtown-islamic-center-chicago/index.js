const axios = require('axios')
const cheerio = require('cheerio')

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://www.dic-chicago.org')
  const $ = cheerio.load(response.data)

  return [
    {
      uuid4: 'ea296a5e-ba5c-40b0-9a8a-6ac6bf42c857',
      crawlTime: date,
      name: 'Downtown Islamic Center',
      url: 'https://www.dic-chicago.org',
      address: '231 S State St #4, Chicago, IL 60604, USA',
      placeId: 'ChIJT7yggtHRD4gRlUbrWuBRJYw',
      timeZoneId: 'America/Chicago',
      geo: {
        latitude: 41.878692,
        longitude: -87.627349
      },
      fajrIqama: $('#post-40 > div > div:nth-child(1) > div > div > div > div:nth-child(1) > div > table > tbody > tr:nth-child(4) > td:nth-child(2)').text().trim(),
      zuhrIqama: $('#post-40 > div > div:nth-child(1) > div > div > div > div:nth-child(1) > div > table > tbody > tr:nth-child(4) > td:nth-child(3)').text().trim(),
      asrIqama: $('#post-40 > div > div:nth-child(1) > div > div > div > div:nth-child(1) > div > table > tbody > tr:nth-child(4) > td:nth-child(4)').text().trim(),
      maghribIqama: $('#post-40 > div > div:nth-child(1) > div > div > div > div:nth-child(1) > div > table > tbody > tr:nth-child(4) > td:nth-child(5)').text().trim(),
      ishaIqama: $('#post-40 > div > div:nth-child(1) > div > div > div > div:nth-child(1) > div > table > tbody > tr:nth-child(4) > td:nth-child(6)').text().trim(),
      juma1: 'check website',
      juma2: 'check website'
    }
  ]
}
