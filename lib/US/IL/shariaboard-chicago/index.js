const util = require('../../../util')

const ids = [
  {
    uuid4: '9fcf6eb9-9795-4ea9-b2bc-cf74b68e2994',
    name: 'Rahmat-e-Alam Foundation - Western Building',
    url: 'https://www.shariahboard.org/',
    address: '7045 N Western Ave, Chicago, IL 60645, USA',
    placeId: 'ChIJT7yggtHRD4gRlUbrWuBRJYw',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 42.009954,
      longitude: -87.689971
    }
  },
  {
    uuid4: 'eff0d63a-3b35-4c54-bfa7-9b5b6d8a76d7',
    name: 'Rahmat-e-Alam Foundation - California Building',
    url: 'https://www.shariahboard.org/',
    address: '6201 N California Ave, Chicago, IL 60659, USA',
    placeId: 'ChIJdQdsux_OD4gRkH5DT01BEpI',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 41.994201,
      longitude: -87.699305
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  util.setTimes(ids[0], [
    $('#timing_area_0 > ul > li:nth-child(1) > span').text().trim(),
    $('#timing_area_0 > ul > li:nth-child(2) > span').text().trim(),
    $('#timing_area_0 > ul > li:nth-child(3) > span').text().trim(),
    $('#timing_area_0 > ul > li:nth-child(4) > span').text().trim(),
    $('#timing_area_0 > ul > li:nth-child(5) > span').text().trim(),
    $('#timing_area_0 > ul > li:nth-child(6) > span').text().trim()
  ])

  util.setTimes(ids[1], [
    $('#timing_area_1 > ul > li:nth-child(1) > span').text().trim(),
    $('#timing_area_1 > ul > li:nth-child(2) > span').text().trim(),
    $('#timing_area_1 > ul > li:nth-child(3) > span').text().trim(),
    $('#timing_area_1 > ul > li:nth-child(4) > span').text().trim(),
    $('#timing_area_1 > ul > li:nth-child(5) > span').text().trim(),
    $('#timing_area_1 > ul > li:nth-child(6) > span').text().trim()
  ])

  return ids
}
exports.ids = ids
