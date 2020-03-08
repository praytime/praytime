/* globals $ */
const puppeteer = require('puppeteer')
exports.puppeteer = true

exports.run = async () => {
  let results = []

  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()

    await page.goto('http://www.mosquefoundation.org/')

    results = await page.evaluate(() => {
      return [
        {
          uuid4: '613f529b-690a-4ddb-99b4-2ddbd5121e70',
          name: 'Mosque Foundation',
          url: 'http://www.mosquefoundation.org/',
          address: '7360 W 93rd St, Bridgeview, IL 60455, USA',
          placeId: 'ChIJvbna_MY5DogRXE_OTtsvkLs',
          timeZoneId: 'America/Chicago',
          geo: {
            latitude: 41.722827,
            longitude: -87.802968
          },
          fajrIqama: $('#timetable > tbody > tr:nth-child(4) > td.iqama-time').text().trim(),
          zuhrIqama: $('#timetable > tbody > tr:nth-child(6) > td.iqama-time').text().trim(),
          asrIqama: $('#timetable > tbody > tr:nth-child(7) > td.iqama-time').text().trim(),
          maghribIqama: $('#timetable > tbody > tr:nth-child(8) > td.iqama-time').text().trim(),
          ishaIqama: $('#timetable > tbody > tr:nth-child(9) > td.iqama-time').text().trim(),
          juma1: $('#timetable > tbody > tr:nth-child(10) > td:nth-child(2)').text().trim(),
          juma2: $('#timetable > tbody > tr:nth-child(11) > td:nth-child(2)').text().trim()
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
