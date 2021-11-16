const puppeteer = require('puppeteer')
const util = require('../../../util')
exports.puppeteer = true

const ids = [
  {
    uuid4: '13211926-3e33-4516-b22e-23ecafffad46',
    name: 'Masjid Al Noor, ISM West',
    url: 'https://www.ismonline.org/ism-west.html',
    timeZoneId: 'America/Chicago',
    address: '16670 Pheasant Dr, Brookfield, WI 53005, USA',
    placeId: 'ChIJ8d4ATMMGBYgR-wMaKrJER0w',
    geo: {
      latitude: 43.06634710000001,
      longitude: -88.1199051
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
