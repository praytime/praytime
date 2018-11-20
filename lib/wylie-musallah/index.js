const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: 'f9144d4a-8ece-459c-81e1-62b7d7642074',
    name: 'Wylie Musallah',
    url: 'http://www.wyliemusallah.org/',
    timeZoneId: 'America/Chicago',
    address: '3990 Lakeway Dr, St Paul, TX 75098, USA',
    geo: {
      latitude: 33.048499,
      longitude: -96.567125
    },
    placeId: 'ChIJdXyLjSUFTIYRahClmXUEeOM'
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://www.wyliemusallah.org/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  // having multiple elements w/same id is invalid. So instead of
  // #pt have to use div[id=pt] to match all the elements, then
  // use jQuery eq to select the right one.
  results[0].fajrIqama = $('div[id=pt]').eq(0).find('table > tbody > tr > td:nth-child(3)').text().trim()
  results[0].zuhrIqama = $('div[id=pt]').eq(1).find('table > tbody > tr > td:nth-child(3)').text().trim()
  results[0].asrIqama = $('div[id=pt]').eq(2).find('table > tbody > tr > td:nth-child(3)').text().trim()
  results[0].maghribIqama = $('div[id=pt]').eq(3).find('table > tbody > tr > td:nth-child(3)').text().trim()
  results[0].ishaIqama = $('div[id=pt]').eq(4).find('table > tbody > tr > td:nth-child(3)').text().trim()
  results[0].juma1 = $('div[id=pt]').eq(5).find('table > tbody > tr > td:nth-child(3)').text().trim()

  return results
}
