const axios = require('axios')
const cheerio = require('cheerio')

const ids = [
  {
    uuid4: '5b0ac5ac-cc16-48ef-94cf-5bb695d2a062',
    name: 'Mansfield Islamic Center',
    url: 'http://www.mansfieldmasjid.com/',
    timeZoneId: 'America/Chicago',
    address: '6401 New York Ave # 135, Arlington, TX 76018, USA',
    geo: {
      latitude: 32.642461,
      longitude: -97.074488
    },
    placeId: 'ChIJeTgrLsaJToYRtcOVJIVkLBw'
  }
]

exports.run = async () => {
  const response = await axios.get('http://www.mansfieldmasjid.com/')
  const $ = cheerio.load(response.data)


  ids[0].fajrIqama = $('#text-24 > div > table > tbody > tr:nth-child(1) > th:nth-child(2) > div').text().trim()
  ids[0].zuhrIqama = $('#text-24 > div > table > tbody > tr:nth-child(2) > td:nth-child(2) > div > strong').text().trim()
  ids[0].asrIqama = $('#text-24 > div > table > tbody > tr:nth-child(3) > td:nth-child(2) > div').text().trim()
  ids[0].maghribIqama = $('#text-24 > div > table > tbody > tr:nth-child(4) > td:nth-child(2) > div').text().trim()
  ids[0].ishaIqama = $('#text-24 > div > table > tbody > tr:nth-child(5) > td:nth-child(2) > div').text().trim()
  ids[0].juma1 = $('#text-24 > div > table > tbody > tr:nth-child(6) > td:nth-child(2) > div').text().trim()
  ids[0].juma2 = $('#text-24 > div > table > tbody > tr:nth-child(7) > td:nth-child(2) > div').text().trim()

  return ids
}
