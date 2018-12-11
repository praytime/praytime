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
  const date = new Date()
  const response = await axios.get('http://www.dareleman.org/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date
  results[0].fajrIqama = $('#panel-169-1-1-0 > div > div:nth-child(2) > div.salat').text()
  results[0].zuhrIqama = $('#panel-169-1-1-0 > div > div:nth-child(3) > div.salat').text()
  results[0].asrIqama = $('#panel-169-1-1-0 > div > div:nth-child(4) > div.salat').text()
  results[0].maghribIqama = $('#panel-169-1-1-0 > div > div:nth-child(5) > div.salat').text()
  results[0].ishaIqama = $('#panel-169-1-1-0 > div > div:nth-child(6) > div.salat').text()
  results[0].juma1 = 'check website'

  return results
}
