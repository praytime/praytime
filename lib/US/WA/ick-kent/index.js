const puppeteer = require('puppeteer')
const util = require('../../../util')
exports.puppeteer = true

const ids = [
  {
    uuid4: '3c9ad4a0-1eec-43ec-ad55-c92531c5acf5',
    name: 'Islamic Center of Kent',
    url: 'http://islamiccenterofkent.org',
    timeZoneId: 'America/Los_Angeles',
    address: '20857 108th Ave SE, Kent, WA 98031, USA',
    geo: {
      latitude: 47.414238,
      longitude: -122.198083
    },
    placeId: 'ChIJa9oRvTVckFQRXhoz138Dq08'
  }
]

exports.run = async () => {
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()

    await page.goto('https://mysalah.herokuapp.com/salah/widget/ick', { waitUntil: 'networkidle0' })

    const t = await page.$$eval('.glow:last-child', (es) => es.map((e) => e.textContent.trim()))
    // t = ['Iqama', '6:40 am', '1:30 pm', '5:00 pm', '6:35 pm', '8:15 pm']
    util.setIqamaTimes(ids[0], t.slice(1))

    const j = await page.$$eval('.salah-head', (es) => es.map((e) => e.textContent.trim()))
    // j = ['ICK Friday Prayers at 1:30 & 2:30 PM']
    util.setJumaTimes(ids[0], j[0].match(/\d{1,2}\s*:\s*\d{1,2}/g))
  } finally {
    await browser.close()
  }

  return ids
}

exports.ids = ids
