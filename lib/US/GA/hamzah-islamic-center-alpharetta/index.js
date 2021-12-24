const puppeteer = require('puppeteer')
const util = require('../../../util')
exports.puppeteer = true

const ids = [
  {
    uuid4: 'abe79662-a72c-44f8-a440-891fe79f18bf',
    name: 'Hamzah Islamic Center',
    url: 'http://www.masjidhamzah.com/',
    timeZoneId: 'America/New_York',
    address: '665 Tidwell Rd, Alpharetta, GA 30004, USA',
    placeId: 'ChIJS8iz3wG14RQRc78x7CKKeZk',
    geo: {
      latitude: 34.1173768,
      longitude: -84.24862879999999
    }
  }
]

exports.run = async () => {
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()

    await page.goto(ids[0].url, { waitUntil: 'networkidle0' })

    const a = await util.pptMapToText(page, '.ptTable td:nth-child(3)')
    const j = await util.pptMapToText(page, 'h4 + div > p')

    util.setIqamaTimes(ids[0], a)
    util.setJumaTimes(ids[0], j
      .slice(0, 2)
      .map(util.extractTimeAmPm))
  } finally {
    await browser.close()
  }

  return ids
}

exports.ids = ids
