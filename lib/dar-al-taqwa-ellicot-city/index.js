const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '1427f2cf-32da-4fca-927c-6968f305181e',
    name: 'Dar Al-Taqwa',
    url: 'http://www.taqwa.net/',
    address: '10740 MD-108, Ellicott City, MD 21042, USA',
    placeId: 'ChIJAaZU4WLft4kRrFN2eSzKLwo',
    timeZoneId: 'America/New_York',
    geo: {
      latitude: 39.2367,
      longitude: -76.884527
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://www.taqwa.net/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $('#block-block-6 > div > div > div > table > tbody > tr:nth-child(1) > td.three').text().trim()
  results[0].zuhrIqama = $('#block-block-6 > div > div > div > table > tbody > tr:nth-child(2) > td.three').text().trim()
  results[0].asrIqama = $('#block-block-6 > div > div > div > table > tbody > tr:nth-child(3) > td.three').text().trim()
  results[0].maghribIqama = $('#block-block-6 > div > div > div > table > tbody > tr:nth-child(4) > td.three').text().trim()
  results[0].ishaIqama = 'check website' // $('#block-block-6 > div > div > div > table > tbody > tr:nth-child(5) > td.three').text().trim()
  results[0].juma1 = $('#block-block-31 > div > div > div:nth-child(4) > span:nth-child(2)').text().trim()
  results[0].juma2 = $('#block-block-31 > div > div > div:nth-child(5) > span:nth-child(2)').text().trim()

  return results
}
