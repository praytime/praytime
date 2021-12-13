const puppeteer = require('puppeteer')
const util = require('../../../util')
exports.puppeteer = true

const ids = [
  {
    uuid4: '94b09c4f-615d-4ca3-8847-97eb55b14773',
    name: 'Masjid Al Tazkiah',
    url: 'https://www.foundationoflights.org/',
    timeZoneId: 'America/New_York',
    address: '120 Floral St, Ocoee, FL 34761, USA',
    placeId: 'ChIJ66Ei3OiC54gR-PXPlK1M2lU',
    geo: {
      latitude: 28.5680749,
      longitude: -81.5463109
    }
  }
]

exports.run = async () => {
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()

    await page.goto('https://mawaqit.net/en/w/altazkiah-ocoee', { waitUntil: 'networkidle0' })

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
