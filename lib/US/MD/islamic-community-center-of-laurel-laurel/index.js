const puppeteer = require('puppeteer')
const util = require('../../../util')
exports.puppeteer = true

const ids = [
  {
    uuid4: 'e5cc492d-4fd9-465e-8f4c-0abbd9dec927',
    name: 'Islamic Community Center of Laurel',
    url: 'http://www.icclmd.org/',
    timeZoneId: 'America/New_York',
    address: '7306 Contee Rd, Laurel, MD 20707, USA',
    placeId: 'ChIJERDH4dDct4kRP7ptkJvmB1k',
    geo: {
      latitude: 39.0805959,
      longitude: -76.8800036
    }
  }
]

exports.run = async () => {
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()

    await page.goto('https://icclmd.org/prayertimings.php', { waitUntil: 'networkidle0' })

    let a = await util.pptMapToText(page, '[id$="Iqamah"]')
    a = a.filter(t => t.length)
    const j = await util.pptMapToText(page, '[id$="JummahPrayer"]')

    util.setIqamaTimes(ids[0], a)
    util.setJumaTimes(ids[0], j)
  } finally {
    await browser.close()
  }

  return ids
}

exports.ids = ids
