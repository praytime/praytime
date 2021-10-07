const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: 'f99c3113-9a6d-4385-8638-d9e688ae96b3',
    name: 'Islamic Center of Frisco',
    url: 'https://friscomasjid.org/',
    address: '11137 Frisco St, Frisco, TX 75033, USA',
    timeZoneId: 'America/Chicago',
    placeId: 'ChIJs59GV60-TIYRaz2IAca7nV8',
    geo: {
      latitude: 33.172391,
      longitude: -96.834762
    }
  }
]

exports.run = async () => {
  const response = await axios.get('https://us.mohid.co/tx/dallas/icf')
  const $ = cheerio.load(response.data)

  results[0].fajrIqama = $('#daily > div.list.plusG > ul > li:nth-child(1) > div.prayer_iqama_div').text().trim()
  results[0].zuhrIqama = $('#daily > div.list.plusG > ul > li:nth-child(2) > div.prayer_iqama_div').text().trim()
  results[0].asrIqama = $('#daily > div.list.plusG > ul > li:nth-child(3) > div.prayer_iqama_div').text().trim()
  results[0].maghribIqama = $('#daily > div.list.plusG > ul > li:nth-child(4) > div.prayer_iqama_div').text().trim()
  results[0].ishaIqama = $('#daily > div.list.plusG > ul > li:nth-child(5) > div.prayer_iqama_div').text().trim()
  results[0].juma1 = $('#jummah > div > ul > li:nth-child(1) > div.num').text().trim()
  results[0].juma2 = $('#jummah > div > ul > li:nth-child(3) > div.num').text().trim()

  return results
}
