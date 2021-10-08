const axios = require('axios')
const cheerio = require('cheerio')

const ids = [
  {
    uuid4: '71724b9a-5d03-4038-bdbb-77bb611cfc2f',
    name: 'Baitul Mukarram',
    url: 'http://bicarlington.org/',
    address: '5410, 2116 S Nelson St, Arlington, VA 22204, USA',
    placeId: 'ChIJC8XOXU2xt4kR_VeYRbxRn-Q',
    timeZoneId: 'America/New_York',
    geo: {
      latitude: 38.849596,
      longitude: -77.090572
    }
  }
]

exports.run = async () => {
  const response = await axios.get('http://bicarlington.org/')
  const $ = cheerio.load(response.data)


  ids[0].fajrIqama = $('#ctl00_ctl00_mainPageHolder_prayerTime_lblFajr').text().trim()
  ids[0].zuhrIqama = $('#ctl00_ctl00_mainPageHolder_prayerTime_lblDhuhr').text().trim()
  ids[0].asrIqama = $('#ctl00_ctl00_mainPageHolder_prayerTime_lblAsr').text().trim()
  ids[0].maghribIqama = $('#ctl00_ctl00_mainPageHolder_prayerTime_lblMagrib').text().trim()
  ids[0].ishaIqama = $('#ctl00_ctl00_mainPageHolder_prayerTime_lblIsha').text().trim()
  ids[0].juma1 = $('#ctl00_ctl00_mainPageHolder_prayerTime_lblFridayPrayer1').text().match(/\d{1,2}:\d{2}/g)[0]
  ids[0].juma2 = $('#ctl00_ctl00_mainPageHolder_prayerTime_lblFridayPrayer2').text().match(/\d{1,2}:\d{2}/g)[0]

  return ids
}
