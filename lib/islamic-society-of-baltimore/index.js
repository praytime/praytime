const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '6f150f06-267b-41e2-bf9a-4ac4994c42aa',
    name: 'Islamic Society of Baltimore',
    url: 'https://isb.org/',
    address: '6631 Johnnycake Rd, Windsor Mill, MD 21244, USA',
    timeZoneId: 'America/New_York',
    placeId: 'ChIJSxyR1rIeyIkRMzYEmtZyAec',
    geo: {
      latitude: 39.303512,
      longitude: -76.747874
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://us.mohid.co/md/mdrgn/isb')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date
  results[0].fajrIqama = $('#daily > div.list.plusG > ul > li:nth-child(1) > div.prayer_iqama_div').text().trim()
  results[0].zuhrIqama = $('#daily > div.list.plusG > ul > li:nth-child(2) > div.prayer_iqama_div').text().trim()
  results[0].asrIqama = $('#daily > div.list.plusG > ul > li:nth-child(3) > div.prayer_iqama_div').text().trim()
  results[0].maghribIqama = $('#daily > div.list.plusG > ul > li:nth-child(4) > div.prayer_iqama_div').text().trim()
  results[0].ishaIqama = $('#daily > div.list.plusG > ul > li:nth-child(5) > div.prayer_iqama_div').text().trim()
  results[0].juma1 = $('#jummah > div > ul > li:nth-child(1) > div.num').text().trim()
  results[0].juma2 = $('#jummah > div > ul > li:nth-child(3) > div.num').text().trim()

  return results
}
