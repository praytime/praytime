const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '27ed8296-c06e-4e92-a4aa-fadc2b7a0a90',
    name: 'Islamic Center of Coppell and Lewisville',
    url: 'https://icclmasjid.org/',
    timeZoneId: 'America/Chicago',
    address: '600 E Sandy Lake Rd Suite 110, Coppell, TX 75019, USA',
    geo: {
      latitude: 32.969146,
      longitude: -96.975778
    },
    placeId: 'ChIJ_a2qGTIpTIYRTmRroCejyHo'
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://icclmasjid.org/')
  const $ = cheerio.load(response.data)

  const t = $('#text-9 > div > p:nth-child(1)').text().match(/\d{1,2}\s*:\s*\d{1,2}/g)
  const j = $('#text-9 > div > p:nth-child(2)').text().match(/\d{1,2}\s*:\s*\d{1,2}/g)

  results[0].crawlTime = date
  results[0].fajrIqama = t[0]
  results[0].zuhrIqama = t[1]
  results[0].asrIqama = t[2]
  results[0].maghribIqama = $('#text-9 > div > p:nth-child(1)').text().match(/Maghrib: ([\w\s]+)\n/)[1]
  results[0].ishaIqama = t[3]
  results[0].juma1 = j[0]

  return results
}
