const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: 'a29de6c9-b35b-4c29-956d-f0eda7338c61',
    name: 'Al-Aqsa Community Center',
    url: 'http://www.accplainfield.org/',
    address: '17940 Bronk Rd, Plainfield, IL 60586, USA',
    placeId: 'ChIJu0A5cfKKDogRwwN7sNgCylw',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 41.556664,
      longitude: -88.19109
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://www.accplainfield.org/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $('table#Table_01 td:contains("Fajr") + td').text().trim()
  results[0].zuhrIqama = $('table#Table_01 td:contains("ZUHR") + td').text().trim()
  results[0].asrIqama = $('table#Table_01 td:contains("ASR") + td').text().trim()
  results[0].maghribIqama = $('table#Table_01 td:contains("MAGHRIB") + td').text().trim()
  results[0].ishaIqama = $('table#Table_01 td:contains("ISHA") + td').text().trim()
  results[0].juma1 = $('table#Table_01 td:contains("1st Jumu") + td').text().trim()
  results[0].juma2 = $('table#Table_01 td:contains("2nd Jumu") + td').text().trim()
  results[0].juma3 = $('table#Table_01 td:contains("3rd Jumu") + td').text().trim()

  return results
}
