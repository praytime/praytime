const axios = require('axios')
const cheerio = require('cheerio')
const util = require('../../../util')

const results = [
  {
    uuid4: '36815bd3-d6d5-44a5-a3c2-33a9c5ea42fb',
    name: 'Islamic Society of Central Jersey',
    url: 'https://iscj.org/',
    address: '4145 US-1, Monmouth Junction, NJ 08852, USA',
    placeId: 'ChIJR6vNPjjdw4kR0c3GWMN_KE4',
    timeZoneId: 'America/New_York',
    geo: {
      latitude: 40.387797,
      longitude: -74.571199
    }
  }
]

exports.run = async () => {
  const response = await axios.get('https://iscj.org/')
  const $ = cheerio.load(response.data)


  const d = $('div.mtphr-dnt-tick-contents').text().trim()

  util.setIqamaTimes(results[0], [
    d.match(/fajr\s+([^,]+)/i)[1],
    d.match(/dhuhr\s+([^,]+)/i)[1],
    d.match(/asr\s+([^,]+)/i)[1],
    'check website (sunset)',
    d.match(/isha\s+([\d\w:]+)/i)[1],
  ])

  results[0].juma1 = d.match(/juma.*/i)[0]
  results[0].juma2 = d.match(/juma.*/i)[0]
  results[0].juma3 = d.match(/juma.*/i)[0]

  return results
}
