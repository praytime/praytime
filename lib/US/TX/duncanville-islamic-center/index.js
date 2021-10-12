const puppeteer = require('puppeteer')
const util = require('../../../util')

exports.puppeteer = true

const ids = [
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
    placeId: 'ChIJhW1M6eyRToYRljThXe1ulDc'
  }
]

exports.run = async () => {
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()

    // ignore return from page.goto
    const [frame] = await Promise.all([
      util.waitForFrame(page, 'wix-visual-data.appspot.com'),
      // networkidle0: all tcp connections idle for at least 500 ms
      page.goto(ids[0].url, { waitUntil: 'networkidle0' })
    ])

    const table = await frame.waitForSelector('table#theTable')

    // eval() evaluates the selector ids in the browser
    const t = await table.$$eval('td', (tds) => tds.map((td) => td.textContent.trim()))

    util.setIqamaTimes(ids[0], [
      t[1],
      t[3],
      t[5],
      t[7],
      t[9]
    ])
    ids[0].juma1 = t[11]
    ids[0].juma2 = t[13]
  } finally {
    await browser.close()
  }

  return ids
}
exports.ids = ids
