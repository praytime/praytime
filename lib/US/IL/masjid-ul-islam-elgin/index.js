const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: 'a3f6b73c-6e49-4651-a95f-5af2d6ac8c09',
    name: 'Masjid Ul Islam',
    url: 'http://www.iieonline.org/',
    address: '1280 Bluff City Blvd, Elgin, IL 60120, USA',
    placeId: 'ChIJvTOnbYQGD4gRP4Y3OQWN74I',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 42.018804,
      longitude: -88.240546
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://www.iieonline.org/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date
  results[0].fajrIqama = $("#jamaat > ul > li:nth-child(1) > span").text()
  results[0].zuhrIqama = $("#jamaat > ul > li:nth-child(2) > span").text()
  results[0].asrIqama = $("#jamaat > ul > li:nth-child(3) > span").text()
  results[0].maghribIqama = $("#jamaat > ul > li:nth-child(4) > span").text()
  results[0].ishaIqama = $("#jamaat > ul > li:nth-child(5) > span").text()
  results[0].juma1 = $("#jamaat > ul > li:nth-child(6) > span").text()

  return results
}
