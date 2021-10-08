const axios = require('axios')
const cheerio = require('cheerio')

const ids = [
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
    address: '700 S Bartlett Rd, Bartlett, IL 60103, USA',
    placeId: 'ChIJTxX-1ckAD4gRc6nJx62Xdmc',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 41.977752,
      longitude: -88.18782
    }
  }
]

exports.run = async () => {
  const response = await axios.get('https://www.icwsmasjid.org/')
  const $ = cheerio.load(response.data)

  ids[0].fajrIqama = $("thead:contains('FAJR') + thead").text().trim().match(/\d{1,2}:\d{1,2}/)[0]
  ids[0].zuhrIqama = $("thead:contains('DHUR') + thead").text().trim().match(/\d{1,2}:\d{1,2}/)[0]
  ids[0].asrIqama = $("thead:contains('ASR') + thead").text().trim().match(/\d{1,2}:\d{1,2}/)[0]
  ids[0].maghribIqama = $("thead:contains('MAGHRIB') + thead").text().trim().match(/\d{1,2}:\d{1,2}/)[0]
  ids[0].ishaIqama = $("thead:contains('ISHA') + thead").text().trim().match(/\d{1,2}:\d{1,2}/)[0]

  ids[1].juma1 = $("h3:contains('Khutbah 1') + div").text().trim().match(/\d{1,2}:\d{1,2}/)[0]
  ids[1].juma2 = $("h3:contains('Khutbah 2') + div").text().trim().match(/\d{1,2}:\d{1,2}/)[0]

  return ids
}
exports.ids = ids
