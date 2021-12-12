const puppeteer = require('puppeteer')
const util = require('../../../util')
exports.puppeteer = true

const ids = [
  {
    uuid4: '0d07282b-2ffb-4f0b-86ee-e50a120a58ab',
    name: 'Masjid Al-Aziz',
    url: 'https://iscf.org/masjid/masjid-al-azziz/',
    timeZoneId: 'America/New_York',
    address: '9501 Satellite Blvd, Orlando, FL 32837, USA',
    placeId: 'ChIJtWEaKJR954gRj9VT_II9-rI',
    geo: {
      latitude: 28.420543,
      longitude: -81.400534
    }
  }
]

exports.run = async () => {
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()

    await page.goto('https://mawaqit.net/en/ma-alaziz-orlando-florida', { waitUntil: 'networkidle0' })

    const divs = await page.$$eval('.prayers > div', es => es.map(e => e.textContent.trim()))

    const a = divs
      .map(t => t.split('\n'))
      .map(([_, az, iq]) => {
        if (util.matchTimeAmPm(iq)) {
          // iqama time exact
          return iq
        } else if (iq.match(/\s*[+-]\s*\d+/)) {
          // iqama time offset from azan
          return [az]
            .map(util.hourMinuteAmPmToMinutes)
            .map(minutes => minutes + parseInt(iq))
            .map(util.minutesTohourMinute)
            .shift()
        } else {
          // ?
          return `${az}|${iq}`
        }
      })

    util.setIqamaTimes(ids[0], a)

    const j = await page.$$eval('div.joumouaa [class*="joumouaa"]', es => es.map(e => e.textContent.trim()))
    util.setJumaTimes(ids[0], j)
  } finally {
    await browser.close()
  }

  return ids
}

exports.ids = ids
