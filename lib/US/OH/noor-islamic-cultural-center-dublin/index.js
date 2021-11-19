const puppeteer = require('puppeteer')
const util = require('../../../util')
exports.puppeteer = true

const ids = [
  {
    uuid4: 'c5a31beb-5590-42d3-97a4-7f8e354298f1',
    name: 'Noor Islamic Cultural Center',
    url: 'http://www.noorohio.org/',
    timeZoneId: 'America/New_York',
    address: '5001 Wilcox Rd, Dublin, OH 43016, USA',
    placeId: 'ChIJQxB5dJ6TOIgROGllm3fednM',
    geo: {
      latitude: 40.0654944,
      longitude: -83.1493139
    }
  }
]

exports.run = async () => {
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()
    await page.goto('https://masjidbox.com/prayer-times/noorohio')

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
