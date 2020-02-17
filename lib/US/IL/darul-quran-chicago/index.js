const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: 'e6e51fe9-61b5-4eff-973b-037ef9cf86f9',
    name: 'Darul Quran',
    url: 'https://www.chicagoquran.com/',
    address: '2514 W Thorndale Ave, Chicago, IL 60659, USA',
    placeId: 'ChIJNw22h-PRD4gR0x9A5P29HqY',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 41.988786,
      longitude: -87.692758
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://www.chicagoquran.com/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $('#icii3usk_BlankListView_icii3usc55_BlankList_icii3usb54__0_0_0_0_fld_icii4xa487_proxyrichTextContainer > p > strong > em > strike > u').first().text().trim()
  results[0].zuhrIqama = $('#icii3usk_BlankListView_icii3usc55_BlankList_icii3usb54__0_0_1_0_fld_icii4xa487_proxyrichTextContainer > p > strong > em > strike > u').text().trim()
  results[0].asrIqama = $('#icii3usk_BlankListView_icii3usc55_BlankList_icii3usb54__0_0_3_0_fld_icii4xa487_proxyrichTextContainer > p > strong > em > strike > u').text().trim()
  results[0].maghribIqama = $('#icii3usk_BlankListView_icii3usc55_BlankList_icii3usb54__0_0_4_0_fld_icii4xa487_proxyrichTextContainer > p > strong > em > strike > u').text().trim()
  results[0].ishaIqama = $('#icii3usk_BlankListView_icii3usc55_BlankList_icii3usb54__0_0_5_0_fld_icii4xa487_proxyrichTextContainer > p > strong > em > strike > u').text().trim()
  results[0].juma1 = $('#icii3usk_BlankListView_icii3usc55_BlankList_icii3usb54__0_0_2_0_fld_icii4xa487_proxyrichTextContainer > p > strong > em > strike > u').text()

  return results
}
