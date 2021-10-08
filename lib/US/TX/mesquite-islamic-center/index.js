const axios = require('axios')
const cheerio = require('cheerio')

const ids = [
  {
    uuid4: 'aaa62010-ee7a-480a-9afc-81fddbd920c9',
    name: 'Mesquite Islamic Center',
    url: 'http://www.micmasjid.com/',
    address: '2419 Franklin Dr, Mesquite, TX 75150, USA',
    geo: {
      latitude: 32.796505,
      longitude: -96.61794
    },
    placeId: 'ChIJBfo8m8ulToYR9ohwTEuA7Dw',
    timeZoneId: 'America/Chicago'
  }
]

exports.run = async () => {
  const response = await axios.get('http://www.micmasjid.com/')
  const $ = cheerio.load(response.data)


  ids[0].fajrIqama = $('#text-2 > article > div > div > div:nth-child(3)').text().trim()
  ids[0].zuhrIqama = $('#text-2 > article > div > div > div:nth-child(5)').text().trim()
  ids[0].asrIqama = $('#text-2 > article > div > div > div:nth-child(7)').text().trim()
  ids[0].maghribIqama = $('#text-2 > article > div > div > div:nth-child(9)').text().trim()
  ids[0].ishaIqama = $('#text-2 > article > div > div > div:nth-child(11)').text().trim()
  ids[0].juma1 = $('#text-2 > article > div > div > div:nth-child(15)').text().trim()

  return ids
}
exports.ids = ids
