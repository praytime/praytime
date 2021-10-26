const axios = require('axios')
const cheerio = require('cheerio')

const ids = [
  {
    uuid4: '09bfc7ba-3bc4-47df-aacf-9b4f55dc987e',
    name: 'Barakaat Ul Quran Center',
    url: 'https://www.barkaatulquran.org/',
    timeZoneId: 'America/Chicago',
    address: '555 W Airport Fwy #170, Irving, TX 75062, USA',
    geo: {
      latitude: 32.839181,
      longitude: -96.95225
    },
    placeId: 'ChIJWxSOxgKDToYR_NAzFqEPFd4'
  }
]

exports.run = async () => {
  const response = await axios.get('https://www.barkaatulquran.org/')
  const $ = cheerio.load(response.data)

  const m = $('#wsite-content div:contains("IQAMAH TIMINGS")').text().match(/(\d{1,2}:\d{1,2})/g)

  ids[0].fajrIqama = m[0]
  ids[0].zuhrIqama = m[1]
  ids[0].asrIqama = m[2]
  ids[0].maghribIqama = 'sunset'
  ids[0].ishaIqama = m[3]
  ids[0].juma1 = m[4]
  ids[0].juma2 = 'check website'

  return ids
}
exports.ids = ids
