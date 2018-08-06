const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: 'aad361ea-8f99-4cac-aec4-399249439cce',
    name: 'Islamic Center of Western Suburbs',
    url: 'http://www.icwsmasjid.org/',
    address: '28W774 Army Trail Rd, West Chicago, IL 60185, USA',
    placeId: 'ChIJh8IdCooAD4gRzjD0rNJ1OTY',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 41.944168,
      longitude: -88.184075
    }
  },
  {
    uuid4: 'da94a43b-ab2c-4f80-8c2e-28a2bdfd8b19',
    name: 'Islamic Center of Western Suburbs Juma',
    url: 'http://www.icwsmasjid.org/',
    address: '751 Army Trail Rd, Bartlett, IL 60103, USA',
    placeId: 'ChIJeZoJ7lgAD4gRUG9-TyWcNDw',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 41.942478,
      longitude: -88.194605
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://www.icwsmasjid.org/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date
  results[0].fajrIqama = $('#JamaatTiming > div.col.span_12.dark.left > div > div > div > div > div.row.pricing-table.five-cols > div:nth-child(1) > div > h4').text().trim().match(/\d{1,2}:\d{1,2}/)[0]
  results[0].zuhrIqama = $('#JamaatTiming > div.col.span_12.dark.left > div > div > div > div > div.row.pricing-table.five-cols > div:nth-child(2) > div > h4').text().trim().match(/\d{1,2}:\d{1,2}/)[0]
  results[0].asrIqama = $('#JamaatTiming > div.col.span_12.dark.left > div > div > div > div > div.row.pricing-table.five-cols > div:nth-child(3) > div > h4').text().trim().match(/\d{1,2}:\d{1,2}/)[0]
  results[0].maghribIqama = $('#JamaatTiming > div.col.span_12.dark.left > div > div > div > div > div.row.pricing-table.five-cols > div:nth-child(4) > div > h4').text().trim()
  results[0].ishaIqama = $('#JamaatTiming > div.col.span_12.dark.left > div > div > div > div > div.row.pricing-table.five-cols > div:nth-child(5) > div > h4').text().trim().match(/\d{1,2}:\d{1,2}/)[0]

  results[1].crawlTime = date
  results[1].juma1 = $('#JumaahTiming > div.col.span_12.dark.left > div > div > div > div.row.pricing-table.two-cols > div:nth-child(1) > div > h4').text().trim().match(/\d{1,2}:\d{1,2}/)[0]

  return results
}
