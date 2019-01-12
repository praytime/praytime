const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: 'c593c46c-da3c-4d90-bfe5-80c4ede6f162',
    name: 'Islamic Association of Lewisville-Flower Mound',
    timeZoneId: 'America/Chicago',
    url: 'https://ialfm.org/',
    address: '2807, 3430 Peters Colony Rd, Flower Mound, TX 75022, USA',
    geo: {
      latitude: 33.035248,
      longitude: -97.083041
    },
    placeId: 'ChIJ4X814jctTIYR3hB4Tie61cI'
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://us.mohid.co/tx/dallas/ialfm/masjid/widget/api/index/?m=prayertimings')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date
  results[0].fajrIqama = $('#daily > div.list > ul > li:nth-child(1) > div.prayer_iqama_div').text().trim()
  results[0].zuhrIqama = $('#daily > div.list > ul > li:nth-child(2) > div.prayer_iqama_div').text().trim()
  results[0].asrIqama = $('#daily > div.list > ul > li:nth-child(3) > div.prayer_iqama_div').text().trim()
  results[0].maghribIqama = $('#daily > div.list > ul > li:nth-child(4) > div.prayer_iqama_div').text().trim()
  results[0].ishaIqama = $('#daily > div.list > ul > li:nth-child(5) > div.prayer_iqama_div').text().trim()
  results[0].juma1 = $('#jummah > div > ul > li:nth-child(1) > div.num').text().trim()

  return results
}
