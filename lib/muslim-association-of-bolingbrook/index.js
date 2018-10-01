const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: 'e8ba38bf-3c61-4e3f-8167-9e6c0c770dea',
    name: 'Masjid Al-Islam',
    address: '560 E N Frontage Rd, Bolingbrook, IL 60440, USA',
    placeId: 'ChIJqbAvBARbDogRZHT8ue9eZD4',
    timeZoneId: 'America/Chicago',
    url: 'http://bolingbrookmasjid.com',
    geo: {
      latitude: 41.698385,
      longitude: -88.044029
    }
  },
  {
    uuid4: 'f15a753e-bae3-4f37-a81c-d352cb8eec72',
    name: "Masjid Al-Jumu'ah",
    address: '351 Veterans Pkwy, Bolingbrook, IL 60490, USA',
    placeId: 'ChIJGe_RdBdZDogRrHICztUkdME',
    timeZoneId: 'America/Chicago',
    url: 'http://bolingbrookmasjid.com',
    geo: {
      latitude: 41.688226,
      longitude: -88.118169
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://us.mohid.co/il/scs/maob')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date
  results[0].fajrIqama = $('#daily > div.list.plusG > ul > li:nth-child(1) > div.prayer_iqama_div').text().trim()
  results[0].zuhrIqama = $('#daily > div.list.plusG > ul > li:nth-child(2) > div.prayer_iqama_div').text().trim()
  results[0].asrIqama = $('#daily > div.list.plusG > ul > li:nth-child(3) > div.prayer_iqama_div').text().trim()
  results[0].maghribIqama = $('#daily > div.list.plusG > ul > li:nth-child(4) > div.prayer_iqama_div').text().trim()
  results[0].ishaIqama = $('#daily > div.list.plusG > ul > li:nth-child(5) > div.prayer_iqama_div').text().trim()
  results[0].juma1 = $('#jummah > div > ul > li:nth-child(1) > div.num').text().trim()
  results[0].juma2 = $('#jummah > div > ul > li:nth-child(3) > div.num').text().trim()

  results[1].crawlTime = date
  results[1].fajrIqama = $('#daily > div.list.plusG > ul > li:nth-child(1) > div.prayer_iqama_div').text().trim()
  results[1].zuhrIqama = $('#daily > div.list.plusG > ul > li:nth-child(2) > div.prayer_iqama_div').text().trim()
  results[1].asrIqama = $('#daily > div.list.plusG > ul > li:nth-child(3) > div.prayer_iqama_div').text().trim()
  results[1].maghribIqama = $('#daily > div.list.plusG > ul > li:nth-child(4) > div.prayer_iqama_div').text().trim()
  results[1].ishaIqama = $('#daily > div.list.plusG > ul > li:nth-child(5) > div.prayer_iqama_div').text().trim()
  results[1].juma1 = $('#jummah > div > ul > li:nth-child(1) > div.num').text().trim()
  results[1].juma2 = $('#jummah > div > ul > li:nth-child(3) > div.num').text().trim()

  return results
}
