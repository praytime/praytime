const axios = require('axios')
const cheerio = require('cheerio')
const util = require('../../../util')

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
  const response = await axios.get('http://www.taqwa.net/', { validateStatus: false })
  const $ = cheerio.load(response.data)

  const d = $('div.daily-prayer-schedule div.three')

  util.setIqamaTimes(results[0], [
    d.eq(1).text().trim(),
    d.eq(2).text().trim(),
    d.eq(3).text().trim(),
    d.eq(4).text().trim(),
    d.eq(5).text().trim(),
  ])


  results[0].juma1 = 'check website'
  results[0].juma2 = 'check website'

  return results
}
