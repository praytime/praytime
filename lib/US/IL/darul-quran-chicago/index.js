const axios = require('axios')
const cheerio = require('cheerio')
const util = require('../../../util')

const results = [
  {
    uuid4: 'e6e51fe9-61b5-4eff-973b-037ef9cf86f9',
    name: 'Darul Quran',
    url: 'https://www.chicagoquran.com/',
    address: '2514 W Thorndale Ave, Chicago, IL 60659, USA',
    placeId: 'ChIJNw22h-PRD4gR0x9A5P29HqY',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 41.988786,
      longitude: -87.692758
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://www.chicagoquran.com/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  util.setIqamaTimes(results[0], [
    $('div > p:contains("Fajr")').parent().next().text().trim(),
    $('div > p:contains("Dhuhr")').parent().next().text().trim(),
    $('div > p:contains("Asr")').parent().next().text().trim(),
    $('div > p:contains("Maghrib")').parent().next().text().trim(),
    $('div > p:contains("Isha")').parent().next().text().trim(),
  ])

  results[0].juma1 = $('div > p:contains("Jumu")').parent().next().text().trim()

  return results
}
