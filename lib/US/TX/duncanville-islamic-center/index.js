/* globals $ */
const puppeteer = require('puppeteer')
const util = require('../../../util')

exports.puppeteer = true

const results = [
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

  // const browser = await puppeteer.launch({ headless: false, args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process'] })
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()

    await page.goto('http://www.dicenter.org/')

    // TODO find the right event to wait for
    console.error('sleeping 10 seconds...')
    await page.waitForTimeout(10000)
    console.error('done')

    const elementHandle = await page.waitForSelector('iframe[title="Table Master"]')

    const frame = await elementHandle.contentFrame()

    const table = await frame.waitForSelector('table#theTable')

    // eval() evaluates the selector results in the browser
    const t = await table.$$eval('td', (tds) => tds.map((td) => td.textContent.trim()))

    util.setIqamaTimes(results[0], [
      t[1],
      t[3],
      t[5],
      t[7],
      t[9]
    ])
    results[0].juma1 = t[11]
    results[0].juma2 = t[13]
  } catch (err) {
    console.error('caught error')
    console.error(err)
  } finally {
    await browser.close()
  }

  return results
}
