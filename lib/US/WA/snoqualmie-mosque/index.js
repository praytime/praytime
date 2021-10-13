const puppeteer = require('puppeteer')
const util = require('../../../util')
exports.puppeteer = true

const ids = [
  {
    uuid4: 'a6a5a3c6-dc9d-438b-9f0e-7e8105660cd0',
    name: 'Snoqualmie Mosque',
    url: 'http://www.snoqualmiemosque.org',
    timeZoneId: 'America/Los_Angeles',
    address: '35324 SE Center St g, Snoqualmie, WA 98065, USA',
    geo: {
      latitude: 47.527982,
      longitude: -121.868874
    },
    placeId: 'ChIJlZrTvKV7kFQRA9FbhOH3jcw'
  }
]

exports.run = async () => {
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()

    await page.goto('http://www.snoqualmiemosque.org/prayers.html', { waitUntil: 'networkidle0' })

    const t = await page.$$eval('tr[style*="white"] td[style*="bold"]', (es) => es.map((e) => e.textContent.trim()))
    util.setIqamaTimes(ids[0], t)

    const j = await page.$$eval('span', (es) => es
      .map((e) => e.textContent.trim())
      .filter((t) => t.match(/khutba:\s*\d{1,2}\s*:\s*\d{1,2}/i)))
    util.setJumaTimes(ids[0], j)
  } finally {
    await browser.close()
  }

  return ids
}
exports.ids = ids
