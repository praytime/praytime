const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '0b614d35-724a-4483-bad5-5f20444dd069',
    name: 'Masjid Madeena',
    url: 'http://masjidmadeena.com',
    timeZoneId: 'America/Los_Angeles',
    address: '15935 NE 8th St Suite B100, Bellevue, WA 98008, USA',
    geo: {
      latitude: 47.616337,
      longitude: -122.127469
    },
    placeId: 'ChIJL-zpaLdtkFQRECFsuDUHy6o'
  }
]

exports.run = async () => {
  const response = await axios.get('http://masjidmadeena.com')
  const $ = cheerio.load(response.data)


  results[0].fajrIqama = $('#text-2 > div > div > table > tbody > tr:nth-child(3) > td:nth-child(3) > h4').text().trim()
  results[0].zuhrIqama = $('#text-2 > div > div > table > tbody > tr:nth-child(5) > td:nth-child(3) > h4').text().trim()
  results[0].asrIqama = $('#text-2 > div > div > table > tbody > tr:nth-child(6) > td:nth-child(3) > h4').text().trim()
  results[0].maghribIqama = $('#text-2 > div > div > table > tbody > tr:nth-child(8) > td:nth-child(3) > h4').text().trim()
  results[0].ishaIqama = $('#text-2 > div > div > table > tbody > tr:nth-child(9) > td:nth-child(3) > h4').text().trim()
  results[0].juma1 = $('#text-2 > div > div > table > tbody > tr:nth-child(10) > td:nth-child(2) > h4').text().trim()

  return results
}
