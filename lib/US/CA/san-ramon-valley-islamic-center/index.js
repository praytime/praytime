/* globals $ */
const puppeteer = require('puppeteer')
exports.puppeteer = true

exports.run = async () => {
  let results = []

  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()

    await page.goto('http://www.srvic.org/')

    results = await page.evaluate(() => {
      return [
        {
          uuid4: '06d76993-f828-4543-a45a-c6a5acc02641',
          name: 'San Ramon Valley Islamic Center',
          url: 'http://www.srvic.org/',
          address: '2232 Camino Ramon, San Ramon, CA 94583, USA',
          placeId: 'ChIJgZMAveryj4ARu8cHwsFnX0E',
          timeZoneId: 'America/Los_Angeles',
          geo: {
            latitude: 37.776787,
            longitude: -121.969178
          },

          fajrIqama: $('h4:contains("Prayer Timings")  + div tr').eq(1).find('td').eq(-1).text().match(/\d{1,2}:\d{1,2}/)[0],
          zuhrIqama: $('h4:contains("Prayer Timings")  + div tr').eq(3).find('td').eq(-1).text().match(/\d{1,2}:\d{1,2}/)[0],
          asrIqama: $('h4:contains("Prayer Timings")  + div tr').eq(4).find('td').eq(-1).text().match(/\d{1,2}:\d{1,2}/)[0],
          maghribIqama: $('h4:contains("Prayer Timings")  + div tr').eq(5).find('td').eq(-1).text().match(/\d{1,2}:\d{1,2}/)[0],
          ishaIqama: $('h4:contains("Prayer Timings")  + div tr').eq(6).find('td').eq(-1).text().match(/\d{1,2}:\d{1,2}/)[0],
          juma1: 'check website'
        }
      ]
    })
  } catch (err) {
    console.error('caught error')
    console.error(err)
  }

  const date = new Date()
  results[0].crawlTime = date

  await browser.close()
  return results
}
