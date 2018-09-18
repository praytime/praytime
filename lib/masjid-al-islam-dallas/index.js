const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: 'e15b52ff-5df0-48f0-938c-65066c8d9b00',
    name: 'Masjid Al-Islam',
    url: 'http://masjidalislam.org',
    timeZoneId: 'America/Chicago',
    address: '2604 S Harwood St, Dallas, TX 75215, USA',
    geo: {
      latitude: 32.767267,
      longitude: -96.779057
    },
    placeId: 'ChIJy0rX1_CYToYRpBUJvsi-7fI'
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://masjidalislam.org/prayer-times/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $('div.wpb_column.vc_column_container.vc_col-sm-12 > div > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(2)').text().trim()
  results[0].zuhrIqama = $('div.wpb_column.vc_column_container.vc_col-sm-12 > div > div > div > div > table > tbody > tr:nth-child(2) > td:nth-child(2)').text().trim()
  results[0].asrIqama = $('div.wpb_column.vc_column_container.vc_col-sm-12 > div > div > div > div > table > tbody > tr:nth-child(3) > td:nth-child(2)').text().trim()
  results[0].maghribIqama = $('div.wpb_column.vc_column_container.vc_col-sm-12 > div > div > div > div > table > tbody > tr:nth-child(4) > td:nth-child(2)').text().trim()
  results[0].ishaIqama = $('div.wpb_column.vc_column_container.vc_col-sm-12 > div > div > div > div > table > tbody > tr:nth-child(5) > td:nth-child(2)').text().trim()
  results[0].juma1 = $('div.wpb_column.vc_column_container.vc_col-sm-12 > div > div > div > div > table > tbody > tr:nth-child(6) > td:nth-child(2)').text().trim()

  return results
}
