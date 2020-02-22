const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '1b00962b-9568-4cee-95e2-ee2056c9ffbe',
    name: 'Muslim Community Association',
    url: 'https://www.mcabayarea.org/',
    address: '3003 Scott Blvd, Santa Clara, CA 95054, USA',
    placeId: 'ChIJY0jYD4jJj4ARPCSyL7wSOCM',
    timeZoneId: 'America/Los_Angeles',
    geo: {
      latitude: 37.376718,
      longitude: -121.959827
    }
  },
  {
    uuid4: '9926fc63-5281-4aa9-9bc1-3aa96cf44ebb',
    name: 'Masjid Al-Noor',
    url: 'https://www.mcabayarea.org/',
    address: '1755 Catherine St, Santa Clara, CA 95050, USA',
    placeId: 'ChIJhY9EUU7Kj4ARX5CNKSkhU4Y',
    timeZoneId: 'America/Los_Angeles',
    geo: {
      latitude: 37.35044,
      longitude: -121.955431
    }
  }
]

exports.run = async () => {
  const response = await axios.get('https://www.mcabayarea.org/')
  const $ = cheerio.load(response.data)
  const date = new Date()

  const p2 = $('td.Prayer02')
  const p3 = $('td.Prayer03')

  results[0].crawlTime = date

  results[0].fajrIqama = p2.eq(1).text().match(/\d{1,2}:\d{2}/g)[1]
  results[0].zuhrIqama = p2.eq(2).text().match(/\d{1,2}:\d{2}/g)[1]
  results[0].asrIqama  = p2.eq(3).text().match(/\d{1,2}:\d{2}/g)[1]
  results[0].maghribIqama = p2.eq(4).text()
  results[0].ishaIqama = p2.eq(5).text().match(/\d{1,2}:\d{2}/g)[1]
  results[0].juma1 = p2.eq(6).text().match(/\d{1,2}:\d{2}/g)[0]
  results[0].juma2 = p2.eq(7).text().match(/\d{1,2}:\d{2}/g)[0]

  results[1].fajrIqama = p3.eq(1).text().match(/\d{1,2}:\d{2}/g)[1]
  results[1].zuhrIqama = p3.eq(2).text().match(/\d{1,2}:\d{2}/g)[1]
  results[1].asrIqama  = p3.eq(3).text().match(/\d{1,2}:\d{2}/g)[1]
  results[1].maghribIqama = p3.eq(4).text()
  results[1].ishaIqama = p3.eq(5).text().match(/\d{1,2}:\d{2}/g)[1]
  results[1].juma1 = p3.eq(6).text().match(/\d{1,2}:\d{2}/g)[0]
  results[1].juma2 = p3.eq(7).text().match(/\d{1,2}:\d{2}/g)[0]

  return results
}
