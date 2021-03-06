const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '3d4df36b-9532-44a1-be32-2cfd4fb08010',
    name: 'New Brunswick Islamic Center',
    url: 'https://www.nbic.org/',
    address: '1330 Livingston Ave, North Brunswick Township, NJ 08902, USA',
    placeId: 'ChIJaz5NthjEw4kR8CNP7bVa7II',
    timeZoneId: 'America/New_York',
    geo: {
      latitude: 40.461986,
      longitude: -74.477192
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://www.nbic.org/')
  const $ = cheerio.load(response.data)

  const r = $('#content > div > div.page-text-wrapper.clearfix > div').text().match(/(\d{1,2}(:\d{2})?)/g)

  results[0].crawlTime = date

  results[0].fajrIqama = r[0]
  results[0].zuhrIqama = r[1]
  results[0].asrIqama = r[2]
  results[0].maghribIqama = 'sunset'
  results[0].ishaIqama = r[3]
  results[0].juma1 = r[4]

  return results
}
