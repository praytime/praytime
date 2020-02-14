const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '65e107c8-b056-457a-a6f1-06280d6410f0',
    name: 'At-Takaful Islamic Society',
    url: 'http://icconline.org/',
    address: '5933 N Lincoln Ave, Chicago, IL 60659, USA',
    placeId: 'ChIJvbnzRRrOD4gRP2mO5m6be7E',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 41.989204,
      longitude: -87.70492
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://icconline.org/')
  const $ = cheerio.load(response.data)

  const p = $('#execphp-2 > div > center > table td.item-qty')

  const j = $('#text-6 > div').text().split("\n")

  results[0].crawlTime = date
  results[0].fajrIqama = p.eq(0).text().trim()
  results[0].zuhrIqama = p.eq(2).text().trim()
  results[0].asrIqama = p.eq(3).text().trim()
  results[0].maghribIqama = p.eq(4).text().trim()
  results[0].ishaIqama = p.eq(5).text().trim()
  results[0].juma1 = j[1]
  results[0].juma2 = j[2]

  return results
}
