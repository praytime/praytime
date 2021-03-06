const axios = require('axios')
const cheerio = require('cheerio')
const parse = require('csv-parse/lib/sync')

const results = [
  {
    name: 'Masjid DarusSalam',
    url: 'http://masjidds.org',
    address: '21W525 North Avenue, Lombard, IL 60148, USA',
    timeZoneId: 'America/Chicago',
    uuid4: '1e948232-29be-48b2-bb74-5f645db0ae2d',
    placeId: 'ChIJiUyP7EGtD4gR1VchuGB3JXE',
    geo: {
      latitude: 41.903020,
      longitude: -88.045350
    }
  }
]

exports.run = async () => {
  const date = new Date()

  const csvResponse = await axios.get('https://docs.google.com/spreadsheets/u/0/d/1bQ282enkhtsCIf_wyu_65ldtEOP-CHvhuZXIdQ5f8d0/pub?range=E10:G21&output=csv')

  const csv = parse(csvResponse.data, { columns: true })

  results[0].crawlTime = date
  results[0].fajrIqama = csv[0].Iqamah
  results[0].zuhrIqama = csv[2].Iqamah
  results[0].asrIqama = csv[3].Iqamah
  results[0].maghribIqama = 'sunset'
  results[0].ishaIqama = csv[5].Iqamah
  results[0].juma1 = 'check website'
  results[0].juma2 = 'check website'

  return results
}
