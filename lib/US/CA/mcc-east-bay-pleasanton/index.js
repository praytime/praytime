const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '804b9404-fd76-4eaa-8bcf-547c3cf084ef',
    name: 'Muslim Community Center – East Bay',
    url: 'https://mcceastbay.org/',
    address: '5724 W Las Positas Blvd #300, Pleasanton, CA 94588, USA',
    placeId: 'ChIJ2Xg1Sl3pj4ARyTAXb2SKLOk',
    timeZoneId: 'America/Los_Angeles',
    geo: {
      latitude: 37.685514,
      longitude: -121.891138
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://mcceastbay.org/')
  const $ = cheerio.load(response.data)

  const iqamaTimes = $('span.dpt_jamah')

  results[0].crawlTime = date

  results[0].fajrIqama = iqamaTimes.eq(0).text().trim()
  results[0].zuhrIqama = iqamaTimes.eq(1).text().trim()
  results[0].asrIqama = iqamaTimes.eq(2).text().trim()
  results[0].maghribIqama = iqamaTimes.eq(3).text().trim()
  results[0].ishaIqama = iqamaTimes.eq(4).text().trim()

  results[0].juma1 = 'check website'
  results[0].juma2 = 'check website'

  return results
}
