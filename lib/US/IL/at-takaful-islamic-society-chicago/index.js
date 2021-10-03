const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '65e107c8-b056-457a-a6f1-06280d6410f0',
    name: 'At-Takaful Islamic Society',
    url: 'http://icconline.org/',
    address: '5933 N Lincoln Ave, Chicago, IL 60659, USA',
    placeId: 'ChIJvbnzRRrOD4gRP2mO5m6be7E',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 41.989204,
      longitude: -87.70492
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://icconline.org/')
  const $ = cheerio.load(response.data)

  const j = $('div#content.middle h3:contains("JUMUAH") + h4').text().split("\n")

  results[0].crawlTime = date
  results[0].fajrIqama = $('div.execphpwidget td:contains("Fajr") ~ td').eq(-1).text().trim()
  results[0].zuhrIqama = $('div.execphpwidget td:contains("Dhuhr") ~ td').eq(-1).text().trim()
  results[0].asrIqama = $('div.execphpwidget td:contains("Asr") ~ td').eq(-1).text().trim()
  results[0].maghribIqama = $('div.execphpwidget td:contains("Maghrib") ~ td').eq(-1).text().trim()
  results[0].ishaIqama = $('div.execphpwidget td:contains("Isha") ~ td').eq(-1).text().trim()
  results[0].juma1 = j[1].match(/\d+\s*:\s*\d+\s*\w+/)[0]
  results[0].juma2 = j[2].match(/\d+\s*:\s*\d+\s*\w+/)[0]

  return results
}
