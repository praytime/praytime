const axios = require('axios')
const cheerio = require('cheerio')
const util = require('../../../util')

const ids = [
  {
    uuid4: 'c7f52457-b461-44de-9f37-4f3b43aecaf6',
    name: 'East Plano Islamic Center',
    url: 'http://epicmasjid.org',
    address: '1350 Star Ct, Plano, TX 75074, USA',
    placeId: 'ChIJvdyH6-sbTIYREMaa7JQJCsc',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 33.01005,
      longitude: -96.646647
    }
  }
]

exports.run = async () => {
  const response = await axios.get('http://epicmasjid.org')
  const $ = cheerio.load(response.data)


  util.setIqamaTimes(ids[0], [
    $('div.cl-prayer-flex h4:contains("Fajr") + h6').text().match(/(\d{1,2}:\d{2}\s+\w+)/g)[1],
    $('div.cl-prayer-flex h4:contains("Dhuhr") + h6').text().match(/(\d{1,2}:\d{2}\s+\w+)/g)[1],
    $('div.cl-prayer-flex h4:contains("Asr") + h6').text().match(/(\d{1,2}:\d{2}\s+\w+)/g)[1],
    $('div.cl-prayer-flex h4:contains("Maghrib") + h6').text().match(/(\d{1,2}:\d{2}\s+\w+)/g)[1],
    $('div.cl-prayer-flex h4:contains("Isha") + h6').text().match(/(\d{1,2}:\d{2}\s+\w+)/g)[1],
  ])

  ids[0].juma1 = $('table.prayer_table td:contains("1st Jumu") + td').text().trim()
  ids[0].juma2 = $('table.prayer_table td:contains("2nd Jumu") + td').text().trim()
  ids[0].juma3 = $('table.prayer_table td:contains("3rd Jumu") + td').text().trim()

  return ids
}
exports.ids = ids
