const puppeteer = require('puppeteer')
const util = require('../../../util')
exports.puppeteer = true

const ids = [
  {
    uuid4: '76feca79-7b47-486d-a5b9-dcb4d8b8f26a',
    name: 'Manassass Muslim Association',
    url: 'http://www.manassasmuslims.org/',
    timeZoneId: 'America/New_York',
    address: '9059 Euclid Ave, Manassas, VA 20110, USA',
    placeId: 'ChIJDVq7WZlbtokR-xO78Y00IN0',
    geo: {
      latitude: 38.76095499999999,
      longitude: -77.452361
    }
  }
]

exports.run = async () => {
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()

    await page.goto('https://mawaqit.net/en/m/mma?showNotification=0&showSearchButton=0&showFooter=0&showFlashMessage=0', { waitUntil: 'networkidle0' })

    const t = await page.$$eval('.wait', es => es.map(e => e.textContent.trim()))
    util.setIqamaTimes(ids[0], t)

    const j = await page.$$eval('.joumouaa', es => es.map(e => e.textContent.trim()))
    // j = ['Jumua\n1:00PM\n2:00PM']
    util.setJumaTimes(ids[0], j[0].match(util.timeRxG))
  } finally {
    await browser.close()
  }

  return ids
}

exports.ids = ids
