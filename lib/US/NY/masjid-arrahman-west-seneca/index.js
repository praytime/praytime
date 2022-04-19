const puppeteer = require('puppeteer')
const util = require('../../../util')
exports.puppeteer = true

const ids = [
  {
    uuid4: '0913ff56-2bbf-4254-a56a-b1a2535c727a',
    name: 'Masjid Arrahman',
    url: 'https://masjidbox.com/prayer-times/arrahman-1630975759761',
    timeZoneId: 'America/New_York',
    address: '171 Knox Ave, West Seneca, NY 14224, USA',
    placeId: 'ChIJwxb-y94N04kRwndyJTZLRMg',
    geo: {
      latitude: 42.85908209999999,
      longitude: -78.7820203
    }
  }
]

exports.run = async () => {
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()
    await page.goto(ids[0].url)

    await page.waitForSelector('div.iqamah div.time')

    const t = await page.$$eval('div.iqamah div.time', (divs) => divs.map((div) => {
      const p = div.textContent.trim().match(/(\d{1,2})(\d{2}\w+)/)
      // convert 630AM => 6:30AM
      return `${p[1]}:${p[2]}`
    }))
    util.setIqamaTimes(ids[0], t)

    const j = await page.$$eval('div.jumuah-times div.athan-time', (divs) => divs.map((div) => {
      const p = div.textContent.trim().match(/(\d{1,2})(\d{2}\w+)/)
      // convert 630AM => 6:30AM
      return `${p[1]}:${p[2]}`
    }))
    util.setJumaTimes(ids[0], j)
  } finally {
    await browser.close()
  }

  return ids
}

exports.ids = ids
