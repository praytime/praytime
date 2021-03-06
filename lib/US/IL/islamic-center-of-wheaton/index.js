const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '70b2e71e-dab0-417d-a8c6-80076fa141e1',
    name: 'Islamic Center of Wheaton',
    url: 'https://www.icwonline.org/',
    address: '900 E Geneva Rd, Wheaton, IL 60187, USA',
    timeZoneId: 'America/Chicago',
    placeId: 'ChIJBTAAF6FUDogRMwiFUx8max4',
    geo: {
      latitude: 41.887677,
      longitude: -88.093184
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://us.mohid.co/il/nwcs/icw')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $('#daily > div.list.plusG > ul > li:nth-child(1) > div.prayer_iqama_div').text().trim()
  results[0].zuhrIqama = $('#daily > div.list.plusG > ul > li:nth-child(2) > div.prayer_iqama_div').text().trim()
  results[0].asrIqama = $('#daily > div.list.plusG > ul > li:nth-child(3) > div.prayer_iqama_div').text().trim()
  results[0].maghribIqama = $('#daily > div.list.plusG > ul > li:nth-child(4) > div.prayer_iqama_div').text().trim()
  results[0].ishaIqama = $('#daily > div.list.plusG > ul > li:nth-child(5) > div.prayer_iqama_div').text().trim()
  results[0].juma1 = $('#jummah > div > ul > li:nth-child(1) > div.num').text().trim()

  return results
}
