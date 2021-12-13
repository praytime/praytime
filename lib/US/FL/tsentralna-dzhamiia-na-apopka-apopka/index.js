const puppeteer = require('puppeteer')
const util = require('../../../util')
exports.puppeteer = true

const ids = [
  {
    uuid4: 'f2987bfe-fdce-4623-aa86-a18e675e723a',
    name: 'Muslim Community Center of Apopka',
    url: 'https://mccapopka.com/',
    timeZoneId: 'America/New_York',
    address: '458 Oakland Ave, Apopka, FL 32703, USA',
    placeId: 'ChIJGZQBXhB254gRSStaHIU24Qc',
    geo: {
      latitude: 28.6716829,
      longitude: -81.5033984
    }
  }
]

exports.run = async () => {
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()

    await page.goto(ids[0].url, { waitUntil: 'networkidle0' })

    const a = await page.$$eval('.iqamah',
      tds => tds.map(td => td.textContent.trim()))
    util.setIqamaTimes(ids[0], a)

    const j = await page.$$eval('.sunan',
      tds => tds.map(td => td.textContent.trim()))
    util.setJumaTimes(ids[0], j
      .filter(t => t.includes('Khuṭbah'))
      .map(util.extractTimeAmPm))
  } finally {
    await browser.close()
  }

  return ids
}

exports.ids = ids
