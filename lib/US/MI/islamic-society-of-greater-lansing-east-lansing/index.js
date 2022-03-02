const util = require('../../../util')
const puppeteer = require('puppeteer')
exports.puppeteer = true

const ids = [
  {
    uuid4: '7caff41b-ca22-43ab-a302-b12b38c0152d',
    name: 'Islamic Society of Greater Lansing',
    url: 'https://www.lansingislam.com/',
    timeZoneId: 'America/Detroit',
    address: '920 S Harrison Rd, East Lansing, MI 48823, USA',
    placeId: 'ChIJqWjTK9XDIogRfx_4Ob4JHOY',
    geo: {
      latitude: 42.7241456,
      longitude: -84.49412629999999
    }
  }
]

exports.run = async () => {
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()

    await page.goto(ids[0].url, { waitUntil: 'networkidle0' })

    const a = await util.pptMapToText(page, '[id$=Pariq]')
    a.splice(1, 1) // remove sunrise
    util.setIqamaTimes(ids[0], a)

    let j = await util.pptMapToText(page, 'div.paragraph')
    j = j
      .filter(x => x.includes('Jummah'))
      .map(util.matchTimeAmPmG)
      .flat()
    util.setJumaTimes(ids[0], j)
  } finally {
    await browser.close()
  }
  return ids
}

exports.ids = ids
