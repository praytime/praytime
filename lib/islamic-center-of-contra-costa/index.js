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
      fajrIqama: $('#wsb-element-ea084b2f-352b-4bc0-8fae-084aee435e5c > div > div > table:nth-child(13) > tbody > tr:nth-child(5) > td:nth-child(1) > p > span:nth-child(1)').text().trim(),
      zuhrIqama: $('#wsb-element-ea084b2f-352b-4bc0-8fae-084aee435e5c > div > div > table:nth-child(13) > tbody > tr:nth-child(5) > td:nth-child(2) > p > span:nth-child(1)').text().trim(),
      asrIqama: $('#wsb-element-ea084b2f-352b-4bc0-8fae-084aee435e5c > div > div > table:nth-child(13) > tbody > tr:nth-child(5) > td:nth-child(3) > p > span:nth-child(1)').text().trim(),
      maghribIqama: $('#wsb-element-ea084b2f-352b-4bc0-8fae-084aee435e5c > div > div > table:nth-child(13) > tbody > tr:nth-child(5) > td:nth-child(4) > p > span:nth-child(1)').text().trim(),
      ishaIqama: $('#wsb-element-ea084b2f-352b-4bc0-8fae-084aee435e5c > div > div > table:nth-child(13) > tbody > tr:nth-child(5) > td:nth-child(5) > p > span:nth-child(1)').text().trim(),
      juma1: $('#wsb-element-ea084b2f-352b-4bc0-8fae-084aee435e5c > div > div > table:nth-child(13) > tbody > tr:nth-child(6) > td > p > span:nth-child(2)').text().trim()
    }
  ]
}
