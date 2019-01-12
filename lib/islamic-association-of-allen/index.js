const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '12d8631a-8c92-408c-b8e3-141def46c2d6',
    name: 'Islamic Association of Allen',
    url: 'http://allenmasjid.com/',
    timeZoneId: 'America/Chicago',
    address: '909 Allen Central Dr, Allen, TX 75013, USA',
    geo: {
      latitude: 33.097191,
      longitude: -96.683536
    },
    placeId: 'ChIJfQxsNTYXTIYRg-Qg7f_gLeo'
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://allenmasjid.com/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $("td:contains('Fajr') ~ td:nth-child(3)").text().trim()
  results[0].zuhrIqama = $("td:contains('Dhuhr') ~ td:nth-child(3)").text().trim()
  results[0].asrIqama = $("td:contains('Asr') ~ td:nth-child(3)").text().trim()
  results[0].maghribIqama = $("td:contains('Maghrib') ~ td:nth-child(3)").text().trim()
  results[0].ishaIqama = $("td:contains('Isha') ~ td:nth-child(3)").text().trim()
  results[0].juma1 = $("td:contains('1st Jum') ~ td:nth-child(2)").text().trim()
  results[0].juma2 = $("td:contains('2nd Jum') ~ td:nth-child(2)").text().trim()

  return results
}
