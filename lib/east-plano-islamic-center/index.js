const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: 'c7f52457-b461-44de-9f37-4f3b43aecaf6',
    name: 'East Plano Islamic Center',
    url: 'http://epicmasjid.net',
    address: '1350 Star Ct, Plano, TX 75074, USA',
    placeId: 'ChIJvdyH6-sbTIYREMaa7JQJCsc',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 33.01005,
      longitude: -96.646647
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://epicmasjid.net')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $('div.prayertime  table > tbody > tr:nth-child(2) > td:nth-child(3)').text().trim()
  results[0].zuhrIqama = $('div.prayertime  table > tbody > tr:nth-child(4) > td:nth-child(3)').text().trim()
  results[0].asrIqama = $('div.prayertime  table > tbody > tr:nth-child(5) > td:nth-child(3)').text().trim()
  results[0].maghribIqama = $('div.prayertime  table > tbody > tr:nth-child(6) > td:nth-child(3)').text().trim()
  results[0].ishaIqama = $('div.prayertime  table > tbody > tr:nth-child(7) > td:nth-child(3)').text().trim()
  results[0].juma1 = $('div.jumuatime  table > tbody > tr:nth-child(2) > td:nth-child(2)').text().trim()
  results[0].juma2 = $('div.jumuatime  table > tbody > tr:nth-child(3) > td:nth-child(2)').text().trim()

  return results
}
