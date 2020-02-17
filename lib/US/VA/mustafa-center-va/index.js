const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '8e294bc2-57f9-4b3a-b20e-6ade87654241',
    name: 'Mustafa Center',
    url: 'http://www.mustafacenter.org/',
    address: '6844 Braddock Rd, Annandale, VA 22003, USA',
    timeZoneId: 'America/New_York',
    placeId: 'ChIJufAZgdCyt4kRRs3ejdgPBDQ',
    geo: {
      latitude: 38.812529,
      longitude: -77.183281
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://us.mohid.co/va/richmond/mustafa/masjid/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date
  results[0].fajrIqama = $('#daily > div.list.plusG > ul > li:nth-child(1) > div.prayer_iqama_div').text().trim()
  results[0].zuhrIqama = $('#daily > div.list.plusG > ul > li:nth-child(2) > div.prayer_iqama_div').text().trim()
  results[0].asrIqama = $('#daily > div.list.plusG > ul > li:nth-child(3) > div.prayer_iqama_div').text().trim()
  results[0].maghribIqama = $('#daily > div.list.plusG > ul > li:nth-child(4) > div.prayer_iqama_div').text().trim()
  results[0].ishaIqama = $('#daily > div.list.plusG > ul > li:nth-child(5) > div.prayer_iqama_div').text().trim()
  results[0].juma1 = $('#jummah > div > ul > li:nth-child(1) > div.num').text().trim()
  results[0].juma2 = $('#jummah > div > ul > li:nth-child(2) > div.num').text().trim()

  return results
}
