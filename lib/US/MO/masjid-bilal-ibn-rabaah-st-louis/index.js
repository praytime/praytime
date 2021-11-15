const puppeteer = require('puppeteer')
const util = require('../../../util')
exports.puppeteer = true

const ids = [
  {
    uuid4: '745cea37-a6ef-47b0-b583-28f4ff5ca5e7',
    name: 'Masjid Bilal Ibn Rabaah',
    url: 'https://www.islamstl.org/masjidbilal/',
    timeZoneId: 'America/Chicago',
    address: '3843 W Pine Mall Blvd, St. Louis, MO 63108, USA',
    placeId: 'ChIJ00aAJbm02IcRYsWM5THX7yw',
    geo: {
      latitude: 38.6377917,
      longitude: -90.2403722
    }
  }
]

exports.run = async () => {
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()
    await page.goto(ids[0].url)

    const table = await page.waitForSelector('#bilal-tv')

    // eval() evaluates the selector ids in the browser
    const t = await table.$$eval('td:last-child', tds => tds
      .map(td => td.textContent.trim())
      .filter(t => t.length)
      .filter(t => t.match(/\d+\s*:\s*\d+/)))

    util.setTimes(ids[0], t)
  } finally {
    await browser.close()
  }

  return ids
}

exports.ids = ids
