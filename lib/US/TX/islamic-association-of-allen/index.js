const axios = require('axios')
const cheerio = require('cheerio')

const ids = [
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
  const response = await axios.get('http://allenmasjid.com/')
  const $ = cheerio.load(response.data)


  ids[0].fajrIqama = $("td:contains('Fajr') ~ td:nth-child(3)").text().trim()
  ids[0].zuhrIqama = $("td:contains('Dhuhr') ~ td:nth-child(3)").text().trim()
  ids[0].asrIqama = $("td:contains('Asr') ~ td:nth-child(3)").text().trim()
  ids[0].maghribIqama = $("td:contains('Maghrib') ~ td:nth-child(3)").text().trim()
  ids[0].ishaIqama = $("td:contains('Isha') ~ td:nth-child(3)").text().trim()
  ids[0].juma1 = $("td:contains('1st Jum') ~ td:nth-child(2)").text().trim()
  ids[0].juma2 = $("td:contains('2nd Jum') ~ td:nth-child(2)").text().trim()

  return ids
}
exports.ids = ids
