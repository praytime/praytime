const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '8aba0bd2-35b0-4550-bdee-c9d9feae5fd2',
    name: 'Masjid Al-Mustafa',
    url: 'https://masjidalmustafa.weebly.com',
    address: '300 E 55th St, Westmont, IL 60559, USA',
    timeZoneId: 'America/Chicago',
    placeId: 'ChIJw4fh4PtODogRC2F1kp2jYq0',
    geo: {
      latitude: 41.788639,
      longitude: -87.967464
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://masjidalmustafa.weebly.com')
  const $ = cheerio.load(response.data)

  const target = $("div.paragraph:contains('Fajr:')")
  const t = target.text().match(/(\d{1,2}:\d{2})/g)

  results[0].crawlTime = date

  results[0].fajrIqama = 'check website'
  results[0].zuhrIqama = t[0]
  results[0].asrIqama = t[1]
  results[0].maghribIqama = target.text().match(/Maghrib:\s+([\d\w\s]+)Isha/)[1]
  results[0].ishaIqama = t[2]
  results[0].juma1 = 'check website'

  return results
}
