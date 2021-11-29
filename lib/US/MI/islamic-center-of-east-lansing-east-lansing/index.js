const puppeteer = require('puppeteer')
const util = require('../../../util')
exports.puppeteer = true

const ids = [
  {
    uuid4: 'fad49146-9293-498e-861e-aeca0b836abd',
    name: 'Islamic Center of East Lansing',
    url: 'http://lansingislam.com/',
    timeZoneId: 'America/Detroit',
    address: '920 S Harrison Rd, East Lansing, MI 48823, USA',
    placeId: 'ChIJnXBspnHCIogR1lRplpAjMPk',
    geo: {
      latitude: 42.72396489999999,
      longitude: -84.49419259999999
    }
  }
]

exports.run = async () => {
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()

    await page.goto(ids[0].url)

    await page.waitForSelector('.tableizer-table')

    const t = await page.$$eval('.tableizer-table td:last-child',
      tds => tds.map(td => td.textContent))

    t.splice(1, 1) // remove sunrise

    util.setIqamaTimes(ids[0], t)

    const j = await page.$$eval('div.paragraph > strong',
      es => es.map(e => e.textContent))

    util.setJumaTimes(ids[0], j
      .filter(e => e.includes('Jummah'))
      .map(util.matchTimeAmPmG)
      .shift())
  } finally {
    await browser.close()
  }

  return ids
}

exports.ids = ids
