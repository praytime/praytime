const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '3011dcae-f2fd-49b5-b4e0-5b3bdc351a5f',
    name: 'Dar El-Eman Islamic Center',
    url: 'http://www.dareleman.org/',
    timeZoneId: 'America/Chicago',
    address: '5511 Mansfield Rd, Arlington, TX 76017, USA',
    geo: {
      latitude: 32.65665,
      longitude: -97.136278
    },
    placeId: 'ChIJe3bVAwJjToYRxUtZ8R51FmE'
  }
]

exports.run = async () => {
  const response = await axios.get('http://www.dareleman.org/')
  const $ = cheerio.load(response.data)

  results[0].fajrIqama = $('#text-2 > div > table > tbody > tr:nth-child(1) > td:nth-child(2)').text()
  results[0].zuhrIqama = $('#text-2 > div > table > tbody > tr:nth-child(2) > td:nth-child(2)').text()
  results[0].asrIqama = $('#text-2 > div > table > tbody > tr:nth-child(4) > td:nth-child(2)').text()
  results[0].maghribIqama = $('#text-2 > div > table > tbody > tr:nth-child(5) > td:nth-child(2)').text()
  results[0].ishaIqama = $('#text-2 > div > table > tbody > tr:nth-child(6) > td:nth-child(2)').text()
  results[0].juma1 = $('#text-2 > div > table > tbody > tr:nth-child(3) > td:nth-child(2)').text()

  return results
}
