const axios = require('axios')
const cheerio = require('cheerio')

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://www.islamiccenterofcontracosta.com/')
  const $ = cheerio.load(response.data)

  return [
    {
      uuid4: '8a4ff4b6-9c4b-4dde-9014-d87ba4fdf9e0',
      crawlTime: date,
      name: 'Islamic Center of Contra Costa',
      url: 'http://www.islamiccenterofcontracosta.com/',
      address: '2836 Clayton Rd, Concord, CA 94519, USA',
      placeId: 'ChIJSd0flTFnhYARBaaGsqAIGVM',
      timeZoneId: 'America/Los_Angeles',
      geo: {
        latitude: 37.974394,
        longitude: -122.025492
      },
      fajrIqama: $("td#fajr_time + td").text().trim(),
      zuhrIqama: $("td#dhuhr_time + td").text().trim(),
      asrIqama: $("td#asr_time + td").text().trim(),
      maghribIqama: '-', // $("#maghrib_iqama").text().trim(),
      ishaIqama: $("td#isha_time + td").text().trim(),
      juma1: 'check website'
    }
  ]
}
