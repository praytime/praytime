// const axios = require('axios')
// const cheerio = require('cheerio')

const ids = [
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


  ids[0].fajrIqama = 'check website'
  ids[0].zuhrIqama = 'check website'
  ids[0].asrIqama = 'check website'
  ids[0].maghribIqama = 'check website'
  ids[0].ishaIqama = 'check website'
  ids[0].juma1 = 'check website'

  return ids
}
exports.ids = ids
