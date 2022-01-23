const puppeteer = require('puppeteer')
const util = require('../../../util')
exports.puppeteer = true

const ids = [
  {
    uuid4: '006c3599-f715-40ae-a7ca-5e8cabc66250',
    name: 'New Brunswick Islamic Center',
    url: 'https://www.nbic.org/',
    timeZoneId: 'America/New_York',
    address: '1330 Livingston Ave, North Brunswick Township, NJ 08902, USA',
    placeId: 'ChIJaz5NthjEw4kR8CNP7bVa7II',
    geo: {
      latitude: 40.46151739999999,
      longitude: -74.47753809999999
    }
  }
]

exports.run = async () => {
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()

    await page.goto(ids[0].url, { waitUntil: 'networkidle0' })

    const d = await page.$$eval('.page-description > p > span', es => es.map(e => e.textContent))

    const c = d.map(util.matchTimeAmPmG)

    c[0].splice(3, 0, '-') // add maghrib back in

    util.setIqamaTimes(ids[0], c[0])
    util.setJumaTimes(ids[0], c[1])
  } finally {
    await browser.close()
  }

  return ids
}

exports.ids = ids
