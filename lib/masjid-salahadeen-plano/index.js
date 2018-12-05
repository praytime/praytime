const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '3e87a273-03d2-453c-b778-465c3323dfc9',
    name: 'Masjid Salahadeen',
    url: 'http://masjidsalahadeen.org/',
    timeZoneId: 'America/Chicago',
    address: '6100 K Ave, Plano, TX 75074, USA',
    geo: {
      latitude: 33.058068,
      longitude: -96.688619
    },
    placeId: 'ChIJO5PKkcAZTIYRTh4L65JMhEs'
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://masjidsalahadeen.org/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date
  results[0].fajrIqama = $('#page_in_widget-2 > div > table > tbody > tr:nth-child(1) > td:nth-child(2)').text().trim()
  results[0].zuhrIqama = $('#page_in_widget-2 > div > table > tbody > tr:nth-child(3) > td:nth-child(2)').text().trim()
  results[0].asrIqama = $('#page_in_widget-2 > div > table > tbody > tr:nth-child(4) > td:nth-child(2)').text().trim()
  results[0].maghribIqama = $('#page_in_widget-2 > div > table > tbody > tr:nth-child(5) > td:nth-child(2)').text().trim()
  results[0].ishaIqama = $('#page_in_widget-2 > div > table > tbody > tr:nth-child(6) > td:nth-child(2)').text().trim()
  results[0].juma1 = $('#page_in_widget-2 > div > p:nth-child(5)').text().match(/\d{1,2}:\d{2}/)[0]

  return results
}
