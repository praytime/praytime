const axios = require('axios')
const cheerio = require('cheerio')

const ids = [
  {
    uuid4: 'aaebd1a9-8a8d-401a-aab9-77e3b32e5ce7',
    name: 'McLean Islamic Center',
    url: 'http://mcleanmuslims.org/',
    address: '8800 Jarrett Valley Dr, Vienna, VA 22182, USA',
    timeZoneId: 'America/New_York',
    placeId: 'ChIJCQzQpF61t4kRYD9H56t-xBw',
    geo: {
      latitude: 38.93558,
      longitude: -77.248851
    }
  }
]

exports.run = async () => {
  const response = await axios.get('http://mcleanmuslims.org/')
  const $ = cheerio.load(response.data)
  const j = $('#daily_salat_times > ul > table > tbody > tr:nth-child(10) > td:nth-child(2)').text().match(/(\d{1,2}:\d{1,2})/g)
  ids[0].fajrIqama = $('#daily_salat_times > ul > table > tbody > tr:nth-child(4) > td:nth-child(3)').text()
  ids[0].zuhrIqama = $('#daily_salat_times > ul > table > tbody > tr:nth-child(6) > td:nth-child(3)').text()
  ids[0].asrIqama = $('#daily_salat_times > ul > table > tbody > tr:nth-child(7) > td:nth-child(3)').text()
  ids[0].maghribIqama = $('#daily_salat_times > ul > table > tbody > tr:nth-child(8) > td:nth-child(3)').text()
  ids[0].ishaIqama = $('#daily_salat_times > ul > table > tbody > tr:nth-child(9) > td:nth-child(3)').text()
  ids[0].juma1 = j[0]
  ids[0].juma2 = j[1]
  ids[0].juma3 = j[2]

  return ids
}
