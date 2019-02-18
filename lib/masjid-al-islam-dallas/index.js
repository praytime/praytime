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

  results[0].fajrIqama = $('#block_content_first > div > div > div.col-md-6.mbtm.fadeIn.begood_load.mbtm > div:nth-child(4) > div > div > div > div > div > h3:nth-child(1)').text().match(/\d{1,2}\s*:\s*\d{2}/)[0]
  results[0].zuhrIqama = $('#block_content_first > div > div > div.col-md-6.mbtm.fadeIn.begood_load.mbtm > div:nth-child(4) > div > div > div > div > div > h3:nth-child(3)').text().match(/\d{1,2}\s*:\s*\d{2}/)[0]
  results[0].asrIqama = $('#block_content_first > div > div > div.col-md-6.mbtm.fadeIn.begood_load.mbtm > div:nth-child(4) > div > div > div > div > div > h3:nth-child(5)').text().match(/\d{1,2}\s*:\s*\d{2}/)[0]
  results[0].maghribIqama = $('#block_content_first > div > div > div.col-md-6.mbtm.fadeIn.begood_load.mbtm > div:nth-child(4) > div > div > div > div > div > h3:nth-child(7)').text().trim()
  results[0].ishaIqama = $('#block_content_first > div > div > div.col-md-6.mbtm.fadeIn.begood_load.mbtm > div:nth-child(4) > div > div > div > div > div > h3:nth-child(9)').text().match(/\d{1,2}\s*:\s*\d{2}/)[0]
  results[0].juma1 = $('#block_content_first > div > div > div.col-md-6.mbtm.fadeIn.begood_load.mbtm > div:nth-child(4) > div > div > div > div > div > h3:nth-child(12)').text().match(/\d{1,2}\s*:\s*\d{2}/)[0]

  return results
}
