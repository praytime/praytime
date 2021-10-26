const ids = [
  {
    uuid4: '2761a944-e1bc-4d85-8581-55a4d7536ce2',
    name: 'Madani Masjid',
    url: 'https://www.madanimasjid.org',
    address: '40 North Lincoln Street, Westmont, IL, 60559, USA',
    timeZoneId: 'America/Chicago',
    placeId: 'ChIJVVXlUllODogRulXf-qOuXyw',
    geo: {
      latitude: 41.797492,
      longitude: -87.977081
    },
    fajrIqama: 'check website',
    zuhrIqama: 'check website',
    asrIqama: 'check website',
    maghribIqama: 'check website',
    ishaIqama: 'check website',
    juma1: 'check website'
  }
]

// const axios = require('axios')
// const cheerio = require('cheerio')

// exports.run = async () => {
//   const response = await axios.get('https://www.madanimasjid.org/prayer-times/')
//   const $ = cheerio.load(response.data)

//   ids[0].fajrIqama = 'check website'
//   ids[0].zuhrIqama = 'check website'
//   ids[0].asrIqama = 'check website'
//   ids[0].maghribIqama = 'check website'
//   ids[0].ishaIqama = 'check website'
//   ids[0].juma1 = 'check website'

//   return ids
// }
exports.ids = ids
