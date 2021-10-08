const axios = require('axios')
const cheerio = require('cheerio')

const ids = [
  {
    uuid4: '54e2e0f0-a6a5-43d0-82dc-d2ebbb2e7487',
    name: 'Grand Prairie Islamic Society',
    url: 'http://www.gpmasjid.com/',
    timeZoneId: 'America/Chicago',
    address: 'Suite B, 802 Greenview Dr, Grand Prairie, TX 75050, United States',
    geo: {
      latitude: 32.771838,
      longitude: -97.057007
    },
    placeId: 'ChIJzfstvCOHToYReBF9QBZrDNI'
  }
]

exports.run = async () => {
  const response = await axios.get('https://us.mohid.co/tx/dallas/gpis')
  const $ = cheerio.load(response.data)

  ids[0].fajrIqama = $('#daily > div.list.plusG > ul > li:nth-child(1) > div.prayer_iqama_div').text().trim()
  ids[0].zuhrIqama = $('#daily > div.list.plusG > ul > li:nth-child(2) > div.prayer_iqama_div').text().trim()
  ids[0].asrIqama = $('#daily > div.list.plusG > ul > li:nth-child(3) > div.prayer_iqama_div').text().trim()
  ids[0].maghribIqama = $('#daily > div.list.plusG > ul > li:nth-child(4) > div.prayer_iqama_div').text().trim()
  ids[0].ishaIqama = $('#daily > div.list.plusG > ul > li:nth-child(5) > div.prayer_iqama_div').text().trim()
  ids[0].juma1 = $('#jummah > div > ul > li:nth-child(1) > div.num').text().trim()

  return ids
}
