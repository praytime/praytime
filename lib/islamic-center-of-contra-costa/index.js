// const axios = require('axios')
// const cheerio = require('cheerio')

exports.run = async () => {
  const date = new Date()
  // const response = await axios.get('http://www.islamiccenterofcontracosta.com/')
  // const $ = cheerio.load(response.data)

  // // 2nd row after row containing text
  // const prayerTimeRow = $("tr:contains('Iqama')").nextAll().eq(1)

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
      fajrIqama: 'check website',
      zuhrIqama: 'check website',
      asrIqama: 'check website',
      maghribIqama: 'check website',
      ishaIqama: 'check website',
      juma1: 'check website'
      // fajrIqama: prayerTimeRow.children().eq(0).text().trim(),
      // zuhrIqama: prayerTimeRow.children().eq(1).text().trim(),
      // asrIqama: prayerTimeRow.children().eq(2).text().trim(),
      // maghribIqama: prayerTimeRow.children().eq(3).text().trim(),
      // ishaIqama: prayerTimeRow.children().eq(4).text().trim(),
      // juma1: prayerTimeRow.next().text().match(/\d{1,2}:\d{2}/)[0]
    }
  ]
}
