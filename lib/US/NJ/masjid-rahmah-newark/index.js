const puppeteer = require('puppeteer')
const util = require('../../../util')
exports.puppeteer = true

const ids = [
  {
    uuid4: 'a082447d-7e50-4ee5-b333-f39460ad2701',
    name: 'Masjid Rahmah',
    url: 'http://www.masjidrahmah.org/',
    timeZoneId: 'America/New_York',
    address: '483 Washington St, Newark, NJ 07102, USA',
    placeId: 'ChIJJ8Nc5HFTwokRJuRXGv387uM',
    geo: {
      latitude: 40.7281572,
      longitude: -74.17993059999999
    }
  }
]

exports.run = async () => {
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()

    await page.goto(ids[0].url, { waitUntil: 'networkidle0' })

    const a = await page.$$eval('.prayerbox', es => es.map(e => e.textContent))

    util.setTimes(ids[0], a.map(util.extractTimeAmPm))
  } finally {
    await browser.close()
  }

  return ids
}

exports.ids = ids
