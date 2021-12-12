const axios = require('axios').default
const cheerio = require('cheerio')
const https = require('https')
const util = require('../../../util')

const ids = [
  {
    uuid4: 'f1a68dea-86c9-40e4-a8ab-b25c3364e511',
    name: 'Islamic Center of Osceola Masjid Taqwa',
    url: 'https://masjidtaqwa.org/',
    timeZoneId: 'America/New_York',
    address: '2417 N Central Ave, Kissimmee, FL 34741, USA',
    placeId: 'ChIJtdQH_6KG3YgR0zDhii3d9Ro',
    geo: {
      latitude: 28.318015,
      longitude: -81.408603
    }
  }
]

exports.run = async () => {
  const response = await axios.get(ids[0].url, {
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  })
  const $ = cheerio.load(response.data)

  const a = util.mapToText($, '.table-bordered td:last-child')
  const j = a
    .slice(-1)
    .map(t => t.split('\n'))
    .flat()
    .filter(util.matchTimeAmPm)
    .map(util.extractTimeAmPm)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
