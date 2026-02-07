const puppeteer = require('puppeteer')
const util = require('../../../util')
exports.puppeteer = true

const ids = [
  {
    uuid4: '2322e846-7b5b-4fcb-a39f-d81879984a98',
    name: 'Masjid Al-Rahman',
    url: 'http://iscf.org/masjid/masjid-al-rahman/',
    timeZoneId: 'America/New_York',
    address: '1089 N Goldenrod Rd, Orlando, FL 32807, USA',
    placeId: 'ChIJDZ9OJJhl54gRNGv6Qwl8JVw',
    geo: {
      latitude: 28.5580639,
      longitude: -81.2834484
    }
  }
]

exports.run = async () => {
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()

    await page.goto('https://mawaqit.net/en/alrahman-Orlando-florida', { waitUntil: 'networkidle0' })

    const divs = await page.$$eval('.prayers > div', es => es.map(e => e.textContent.trim()))

    const a = divs
      .map(t => t.split('\n'))
      .map(([_, az, iq]) => {
        if (util.matchTimeAmPm(iq)) {
          // iqama time exact
          return util.extractTimeAmPm(iq)
        } else if (iq.match(/\s*[+-]\s*\d+/)) {
          // iqama time offset from azan
          return [az]
            .map(util.hourMinuteAmPmToMinutes)
            .map(minutes => minutes + util.minuteOffsetFromText(iq))
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
