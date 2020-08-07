/* globals $ */
const puppeteer = require('puppeteer')
exports.puppeteer = true

exports.run = async () => {
  let results = []

  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()

    await page.goto('https://wix-visual-data.appspot.com/app/widget?compId=comp-ikj21sz5&instance=XLPNmXJktb9PWbEe-Lpi2yTuBxM_G08PH7hTc1GnFc8.eyJpbnN0YW5jZUlkIjoiMzc0OWQxNmEtMDFmMS00MmJiLTg0MGUtMGM0MGRiMWYxYjc4IiwiYXBwRGVmSWQiOiIxMzQxMzlmMy1mMmEwLTJjMmMtNjkzYy1lZDIyMTY1Y2ZkODQiLCJtZXRhU2l0ZUlkIjoiMzJjZGUxZWUtY2VmZC00OGFjLWE4OWMtMDQ0MzQ4ZTI4OGE2Iiwic2lnbkRhdGUiOiIyMDIwLTAzLTA5VDEyOjM3OjM2LjI1M1oiLCJkZW1vTW9kZSI6ZmFsc2UsImFpZCI6IjE5MzQ4OWIwLTg5NmMtNGFkMi05NjBmLTNkM2UwNzY5ZmE0MiIsImJpVG9rZW4iOiIwNTg0MzA4NC1jZjBjLTBhMTctMmM5Mi0wODAzOTNmZDkzZGUiLCJzaXRlT3duZXJJZCI6ImJkNTYyYmRkLTBlMDAtNDRhZS1iNGM3LTAwYThlNmVhNGIxNiJ9')

    results = await page.evaluate(() => {
      return [
        {
          uuid4: 'f53572b2-8ac0-47b9-a010-f4cff10800da',
          name: 'Duncanville Islamic Center',
          url: 'http://www.dicenter.org/',
          timeZoneId: 'America/Chicago',
          address: '1419 Acton Ave, Duncanville, TX 75137, USA',
          geo: {
            latitude: 32.63412,
            longitude: -96.901117
          },
          placeId: 'ChIJhW1M6eyRToYRljThXe1ulDc',
          fajrIqama: $('tr:contains("Fajr") td').eq(-1).text().trim(),
          zuhrIqama: $('tr:contains("Dhuhr") td').eq(-1).text().trim(),
          asrIqama: $('tr:contains("Asr") td').eq(-1).text().trim(),
          maghribIqama: $('tr:contains("Maghrib") td').eq(-1).text().trim(),
          ishaIqama: $('tr:contains("Isha") td').eq(-1).text().trim(),
          juma1: $('tr:contains("Jumu") td').eq(-1).text().trim()
        }
      ]
    })

    const date = new Date()
    results[0].crawlTime = date
  } catch (err) {
    console.error('caught error')
    console.error(err)
  } finally {
    await browser.close()
  }

  return results
}
