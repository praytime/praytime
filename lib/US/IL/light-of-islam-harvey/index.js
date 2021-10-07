// const axios = require('axios')
// const cheerio = require('cheerio')

const results = [
  {
    uuid4: '0f2d3588-0e34-4b08-be14-aa2afd926927',
    name: 'Light of Islam',
    url: 'http://lightofislammasjid.org/',
    address: '46 E 147th St, Harvey, IL 60426, USA',
    placeId: 'ChIJqZmyVakjDogR5h13FztqPP8',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 41.622404,
      longitude: -87.653373
    }
  }
]

exports.run = async () => {
  // const response = await axios.get('http://lightofislammasjid.org/')
  // const $ = cheerio.load(response.data)


  results[0].fajrIqama = 'check website'
  results[0].zuhrIqama = 'check website'
  results[0].asrIqama = 'check website'
  results[0].maghribIqama = 'check website'
  results[0].ishaIqama = 'check website'
  results[0].juma1 = 'check website'

  return results
}
