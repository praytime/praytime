const puppeteer = require('puppeteer')
const util = require('../../../util')
exports.puppeteer = true

const ids = [
  {
    uuid4: '8d12d1b6-9ba7-4080-abd4-ef7538e171b8',
    name: 'Al-Tawheed Islamic Center',
    url: 'https://aticjc.com/',
    timeZoneId: 'America/New_York',
    address: '984 West Side Ave, Jersey City, NJ 07306, USA',
    placeId: 'ChIJF87KWSlXwokREJwUbn_1ieE',
    geo: {
      latitude: 40.7331532,
      longitude: -74.07194009999999
    }
  }
]

exports.run = async () => {
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()

    await page.goto(ids[0].url, { waitUntil: 'networkidle2' })

    const spans = await page.$$eval('.pr-tm-lst span:last-child', es => es.map(e => e.textContent.trim()))

    util.setTimes(ids[0], spans.map(util.extractTimeAmPm))
  } finally {
    await browser.close()
  }

  return ids
}

exports.ids = ids
