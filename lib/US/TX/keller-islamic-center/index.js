const axios = require('axios')
const cheerio = require('cheerio')

const ids = [
  {
    uuid4: '3ac35271-c678-4531-8b0a-d8c95a3eb0c6',
    name: 'Keller Islamic Center',
    url: 'http://www.kellerislamiccenter.org/',
    timeZoneId: 'America/Chicago',
    address: '3601 Keller Hicks Rd, Fort Worth, TX 76244, USA',
    geo: {
      latitude: 32.939971,
      longitude: -97.283567
    },
    placeId: 'ChIJmXE3eOzZTYYRcW4Q-KnsbVE'
  }
]

exports.run = async () => {
  const response = await axios.get('http://www.kellerislamiccenter.org/')
  const $ = cheerio.load(response.data)

  // ids[0].fajrIqama = $("td:contains('FAJR') + td").text().trim()
  // ids[0].zuhrIqama = $("td:contains('DHUHAR') + td").text().trim()
  // ids[0].asrIqama = $("td:contains('ASAR') + td").text().trim()
  // ids[0].maghribIqama = $("td:contains('MAGRIB') + td").text().trim()
  // ids[0].ishaIqama = $("td:contains('ISHA') + td").text().trim()
  // ids[0].juma1 = $("td:contains('JUMUAH') + td").text().trim()

  return ids
}
exports.ids = ids
