const axios = require('axios')
const cheerio = require('cheerio')

exports.run = async () => {
  const response = await axios.get('https://il.mohid.net/chicago/cic')
  const $ = cheerio.load(response.data)

  return [
    {
      uuid4: 'c6235d31-e9fc-4f30-9005-7c50b4116d2a',
      name: 'Chicago Islamic Center',
      url: 'http://cicmasjed.org/',
      address: '3357 W 63rd St, Chicago, IL 60629, USA',
      placeId: 'ChIJ4ZXGXc0xDogRkowOpYePJqE',
      timeZoneId: 'America/Chicago',
      geo: {
        latitude: 41.778663,
        longitude: -87.707786
      },
      fajrIqama: $('#daily > div.list.plusG > ul > li:nth-child(1) > div.prayer_iqama_div').text().trim(),
      zuhrIqama: $('#daily > div.list.plusG > ul > li:nth-child(2) > div.prayer_iqama_div').text().trim(),
      asrIqama: $('#daily > div.list.plusG > ul > li:nth-child(3) > div.prayer_iqama_div').text().trim(),
      maghribIqama: $('#daily > div.list.plusG > ul > li:nth-child(4) > div.prayer_iqama_div').text().trim(),
      ishaIqama: $('#daily > div.list.plusG > ul > li:nth-child(5) > div.prayer_iqama_div').text().trim(),
      juma1: $('#jummah > div > ul > li:nth-child(1) > div.num').text().trim()
    }
  ]
}
exports.ids = ids
