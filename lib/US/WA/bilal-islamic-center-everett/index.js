const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: 'b4e14309-4f00-4f67-827f-c14c6408b838',
    name: 'Bilal Ibn Rabah Islamic center',
    url: 'http://bilalislamiccenter.com/',
    timeZoneId: 'America/Los_Angeles',
    address: '607 SE Everett Mall Way Unit 6D, Everett, WA 98204, USA',
    geo: {
      latitude: 47.910235,
      longitude: -122.224584
    },
    placeId: 'ChIJ7eiGP9MGkFQREKOMJdMaFBQ'
  }
]

exports.run = async () => {
  const response = await axios.get('http://www.muslimfeed.com/timesframe.aspx?mi=2106')
  const $ = cheerio.load(response.data)


  results[0].fajrIqama = $('#trFajr > td:nth-child(3)').text().trim()
  results[0].zuhrIqama = $('#trDhuhr > td:nth-child(3)').text().trim()
  results[0].asrIqama = $('#trAsr > td:nth-child(3)').text().trim()
  results[0].maghribIqama = $('#trMaghrib > td:nth-child(3)').text().trim()
  results[0].ishaIqama = $('#trIsha > td:nth-child(3)').text().trim()
  results[0].juma1 = $('#tblDailyTimes > tbody > tr:nth-child(9) > td:nth-child(2)').text().trim()

  return results
}
