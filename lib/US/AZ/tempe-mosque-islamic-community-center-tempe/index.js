const puppeteer = require('puppeteer')
const util = require('../../../util')

exports.puppeteer = true

const ids = [
  {
    uuid4: 'fd321b99-7fc2-47ef-b040-d8d273351c04',
    name: 'Tempe Mosque (Islamic Community Center)',
    url: 'http://www.tempemosque.com/',
    timeZoneId: 'America/Phoenix',
    address: '131 E 6th St, Tempe, AZ 85281, USA',
    placeId: 'ChIJ7fmN_dgIK4cRNAm4iKGKt5A',
    geo: {
      latitude: 33.4240604,
      longitude: -111.9369396
    }
  }
]

exports.run = async () => {
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()
    await page.goto(ids[0].url)

    const table = await page.waitForSelector('table.masjidnow-salah-timings-table')

    // eval() evaluates the selector ids in the browser
    const t = await table.$$eval('.masjidnow-salah-time-iqamah', (tds) => tds.map((td) => td.textContent.trim()))
    t.splice(1, 1) // remove sunrise

    util.setIqamaTimes(ids[0], t)
    ids[0].juma1 = 'check website'
  } finally {
    await browser.close()
  }

  return ids
}

exports.ids = ids
