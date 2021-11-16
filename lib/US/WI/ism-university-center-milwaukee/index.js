const puppeteer = require('puppeteer')
const util = require('../../../util')
exports.puppeteer = true

const ids = [
  {
    uuid4: 'f55066a3-d207-4760-b34f-392b1a991e22',
    name: 'ISM University Center',
    url: 'https://www.ismonline.org/ism-east.html',
    timeZoneId: 'America/Chicago',
    address: '2223 E Kenwood Blvd, Milwaukee, WI 53211, USA',
    placeId: 'ChIJlwNHTcwYBYgRTaUEqvcxJjg',
    geo: {
      latitude: 43.0744352,
      longitude: -87.88185109999999
    }
  }
]

exports.run = async () => {
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()

    await page.goto(ids[0].url, { waitUntil: 'networkidle0' })

    const t = await page.$$eval('#iqamaTimeContainer .circular-bar-content',
      tds => tds.map(td => td.textContent.match(/\d+\s*:\s*\d+\s*\w+/)[0]))
    util.setJumaTimes(ids[0], [t[2]])
    t.splice(2, 1) // remove juma time
    util.setIqamaTimes(ids[0], t)
  } finally {
    await browser.close()
  }

  return ids
}

exports.ids = ids
