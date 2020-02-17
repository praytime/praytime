const axios = require('axios')
const cheerio = require('cheerio')

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://www.shariahboard.org/')
  const $ = cheerio.load(response.data)

  const results = [
    {
      uuid4: '9fcf6eb9-9795-4ea9-b2bc-cf74b68e2994',
      crawlTime: date,
      name: 'Rahmat-e-Alam Foundation - Western Building',
      url: 'https://www.shariahboard.org/',
      address: '7045 N Western Ave, Chicago, IL 60645, USA',
      placeId: 'ChIJT7yggtHRD4gRlUbrWuBRJYw',
      timeZoneId: 'America/Chicago',
      geo: {
        latitude: 42.009954,
        longitude: -87.689971
      },
      fajrIqama: $('#timing_area_0 > ul > li:nth-child(1) > span').text().trim(),
      zuhrIqama: $('#timing_area_0 > ul > li:nth-child(2) > span').text().trim(),
      asrIqama: $('#timing_area_0 > ul > li:nth-child(3) > span').text().trim(),
      maghribIqama: $('#timing_area_0 > ul > li:nth-child(4) > span').text().trim(),
      ishaIqama: $('#timing_area_0 > ul > li:nth-child(5) > span').text().trim(),
      juma1: $('#timing_area_0 > ul > li:nth-child(6) > span').text().trim()
    },
    {
      uuid4: 'eff0d63a-3b35-4c54-bfa7-9b5b6d8a76d7',
      crawlTime: date,
      name: 'Rahmat-e-Alam Foundation - California Building',
      url: 'https://www.shariahboard.org/',
      address: '6201 N California Ave, Chicago, IL 60659, USA',
      placeId: 'ChIJdQdsux_OD4gRkH5DT01BEpI',
      timeZoneId: 'America/Chicago',
      geo: {
        latitude: 41.994201,
        longitude: -87.699305
      },
      fajrIqama: $('#timing_area_1 > ul > li:nth-child(1) > span').text().trim(),
      zuhrIqama: $('#timing_area_1 > ul > li:nth-child(2) > span').text().trim(),
      asrIqama: $('#timing_area_1 > ul > li:nth-child(3) > span').text().trim(),
      maghribIqama: $('#timing_area_1 > ul > li:nth-child(4) > span').text().trim(),
      ishaIqama: $('#timing_area_1 > ul > li:nth-child(5) > span').text().trim(),
      juma1: $('#timing_area_1 > ul > li:nth-child(6) > span').text().trim()
    }
  ]

  return results
}
