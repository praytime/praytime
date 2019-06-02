const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '27ed8296-c06e-4e92-a4aa-fadc2b7a0a90',
    name: 'Islamic Center of Coppell and Lewisville',
    url: 'https://icclmasjid.org/',
    timeZoneId: 'America/Chicago',
    address: '600 E Sandy Lake Rd Suite 110, Coppell, TX 75019, USA',
    geo: {
      latitude: 32.969146,
      longitude: -96.975778
    },
    placeId: 'ChIJ_a2qGTIpTIYRTmRroCejyHo'
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://us.mohid.co/tx/dallas/iccltx/masjid/widget/api/index/?m=prayertimings')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date
  results[0].fajrIqama = $('body > div > div.list > ul > li:nth-child(1) > div.prayer_iqama_div').text().trim()
  results[0].zuhrIqama = $('body > div > div.list > ul > li:nth-child(2) > div.prayer_iqama_div').text().trim()
  results[0].asrIqama = $('body > div > div.list > ul > li:nth-child(3) > div.prayer_iqama_div').text().trim()
  results[0].maghribIqama = 'sunset'
  results[0].ishaIqama = $('body > div > div.list > ul > li:nth-child(5) > div.prayer_iqama_div').text().trim()
  results[0].juma1 = $('body > div > div.list > ul > li:nth-child(7) > div.prayer_iqama_div').text().trim()
  results[0].juma2 = 'check website'

  return results
}
