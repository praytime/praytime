const util = require('../../../util')
// const axios = require('axios')
// const cheerio = require('cheerio')

const ids = [
  {
    uuid4: '6515de3b-bbda-49aa-97bd-6962072a9880',
    name: 'Dar Al-Hijrah',
    url: 'https://hijrah.org/',
    address: '3159 Row St, Falls Church, VA 22044, USA',
    timeZoneId: 'America/New_York',
    placeId: 'ChIJKZHrdH60t4kRDYVdiyL8Gps',
    geo: {
      latitude: 38.861948,
      longitude: -77.14697
    }
  },
  {
    uuid4: 'ddafbb69-e03a-425d-a687-4d2be43173eb',
    name: 'MAS Community Center',
    url: 'https://hijrah.org/',
    address: '6408 Edsall Rd, Alexandria, VA 22312, USA',
    timeZoneId: 'America/New_York',
    placeId: 'ChIJl2nIW_Cyt4kRQHNIy86vKnc',
    geo: {
      latitude: 38.80509,
      longitude: -77.15775
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  util.setIqamaTimes(ids[0], util.mapToText($, 'table.dptTimetable td.jamah'))
  util.setJumaTimes(ids[0], ['check website', 'check website', 'check website'])

  util.setJumaTimes(ids[1], ['check website', 'check website'])

  return ids
}
exports.ids = ids
