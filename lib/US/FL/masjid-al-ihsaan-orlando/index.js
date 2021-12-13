const puppeteer = require('puppeteer')
const util = require('../../../util')
exports.puppeteer = true

const ids = [
  {
    uuid4: '1cdf0dc5-559b-4521-ad46-da5cf6aa22d1',
    name: 'Masjid Al-Ihsaan',
    url: 'http://masjidalihsaan.org/',
    timeZoneId: 'America/New_York',
    address: '6630 Pershing Ave, Orlando, FL 32822, USA',
    placeId: 'ChIJ4yKiZn1k54gRouNYsAnunE8',
    geo: {
      latitude: 28.498652,
      longitude: -81.29546100000002
    }
  }
]

exports.run = async () => {
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()

    await page.goto('https://mawaqit.net/en/w/alihsaan-orlando', { waitUntil: 'networkidle0' })

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

    const j = await page.$$eval('.jumua .time', es => es.map(e => e.textContent.trim()))
    util.setJumaTimes(ids[0], j)
  } finally {
    await browser.close()
  }

  return ids
}

exports.ids = ids
