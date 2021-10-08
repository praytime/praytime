const axios = require('axios')
const cheerio = require('cheerio')

const ids = [
  {
    uuid4: 'e33ad2e4-6986-43c6-87ee-e566eaa906a0',
    name: 'Islamic Center of Northern Virginia',
    url: 'http://icnvt.com/',
    address: '4420 Shirley Gate Rd, Fairfax, VA 22030, USA',
    placeId: 'ChIJW9VHHAVPtokRpLC4ENiNUwQ',
    timeZoneId: 'America/New_York',
    geo: {
      latitude: 38.845966,
      longitude: -77.341281
    }
  }
]

exports.run = async () => {
  const response = await axios.get('http://icnvt.com/')
  const $ = cheerio.load(response.data)


  ids[0].fajrIqama = $('#siddiq-main > div > div > div > div > div.siddiq-layout-cell.siddiq-sidebar1 > div:nth-child(3) > div.siddiq-blockcontent > div > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(3) > strong > span').text().trim()
  ids[0].zuhrIqama = $('#siddiq-main > div > div > div > div > div.siddiq-layout-cell.siddiq-sidebar1 > div:nth-child(3) > div.siddiq-blockcontent > div > table:nth-child(2) > tbody > tr:nth-child(3) > td:nth-child(3) > strong > span').text().trim()
  ids[0].asrIqama = $('#siddiq-main > div > div > div > div > div.siddiq-layout-cell.siddiq-sidebar1 > div:nth-child(3) > div.siddiq-blockcontent > div > table:nth-child(2) > tbody > tr:nth-child(4) > td:nth-child(3) > strong > span').text().trim()
  ids[0].maghribIqama = $('#siddiq-main > div > div > div > div > div.siddiq-layout-cell.siddiq-sidebar1 > div:nth-child(3) > div.siddiq-blockcontent > div > table:nth-child(2) > tbody > tr:nth-child(5) > td:nth-child(3) > strong > span').text().trim()
  ids[0].ishaIqama = $('#siddiq-main > div > div > div > div > div.siddiq-layout-cell.siddiq-sidebar1 > div:nth-child(3) > div.siddiq-blockcontent > div > table:nth-child(2) > tbody > tr:nth-child(6) > td:nth-child(3) > strong > span').text().trim()
  ids[0].juma1 = 'check website'
  ids[0].juma2 = 'check website'

  return ids
}
