const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '1dd45b1c-ec70-449d-9243-b5984cc68c66',
    name: 'Islamic Association of Collin County',
    url: 'https://planomasjid.org',
    address: '6401 Independence Pkwy, Plano, TX 75023, USA',
    placeId: 'ChIJq9bOLqciTIYRCcB6F30aiXQ',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 33.059806,
      longitude: -96.751549
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://planomasjid.org')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $('#mh_display_prayer_times-3 > div > table > tbody > tr:nth-child(1) > td:nth-child(2)').text().trim()
  results[0].zuhrIqama = $('#mh_display_prayer_times-3 > div > table > tbody > tr:nth-child(3) > td:nth-child(2)').text().trim()
  results[0].asrIqama = $('#mh_display_prayer_times-3 > div > table > tbody > tr:nth-child(4) > td:nth-child(2)').text().trim()
  results[0].maghribIqama = $('#mh_display_prayer_times-3 > div > table > tbody > tr:nth-child(5) > td:nth-child(2)').text().trim()
  results[0].ishaIqama = $('#mh_display_prayer_times-3 > div > table > tbody > tr:nth-child(6) > td:nth-child(2)').text().trim()
  results[0].juma1 = $('#mh_display_prayer_times-3 > div > table > tbody > tr:nth-child(7) > td:nth-child(2)').text().trim()
  results[0].juma2 = $('#mh_display_prayer_times-3 > div > table > tbody > tr:nth-child(8) > td:nth-child(2)').text().trim()

  return results
}
