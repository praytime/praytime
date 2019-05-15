const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: 'ea296a5e-ba5c-40b0-9a8a-6ac6bf42c857',
    name: 'Downtown Islamic Center',
    url: 'https://www.dic-chicago.org',
    timeZoneId: 'America/Chicago',
    address: '231 S State St #4, Chicago, IL 60604, USA',
    geo: {
      latitude: 41.878692,
      longitude: -87.627349
    },
    placeId: 'ChIJT7yggtHRD4gRlUbrWuBRJYw'
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://www.dic-chicago.org')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date
  results[0].fajrIqama = $('#tablepress-2 > tbody > tr:contains(FAJR) > td.column-2').text().trim()
  results[0].zuhrIqama = $('#tablepress-2 > tbody > tr:contains(DHUHAR) > td.column-2').text().trim()
  results[0].asrIqama = $('#tablepress-2 > tbody > tr:contains(ASR) > td.column-2').text().trim()
  results[0].maghribIqama = $('#tablepress-2 > tbody > tr:contains(MAGHREB) > td.column-2').text().trim()
  results[0].ishaIqama = $('#tablepress-2 > tbody > tr:contains(ISHA) > td.column-2').text().trim()
  results[0].juma1 = 'check website'
  results[0].juma2 = 'check website'

  return results
}
