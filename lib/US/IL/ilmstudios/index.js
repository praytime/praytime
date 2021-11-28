const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const util = require('../../../util')
exports.puppeteer = true

const ids = [
  {
    uuid4: '40dfeb6d-3b43-4840-a898-6be7f73dd47c',
    name: 'Jama Masjid',
    url: 'https://www.northsidemosque.org/jama-masjid-chicago/',
    timeZoneId: 'America/Chicago',
    address: '6340 N Campbell Ave, Chicago, IL 60659, USA',
    placeId: 'ChIJ276ddN7RD4gRUJhed03Yh-0',
    geo: {
      latitude: 41.9970301,
      longitude: -87.69291199999999
    }
  }, {
    uuid4: '27facd3d-105c-44ad-a5c1-34c174f642e0',
    name: 'Masjid Abu Bakr',
    url: 'https://www.northsidemosque.org/abu-bakr-masjid-roscoe/',
    timeZoneId: 'America/Chicago',
    address: '1017 W Roscoe St, Chicago, IL 60657, USA',
    placeId: 'ChIJj4TPr63TD4gRKRjzHqw8lvY',
    geo: {
      latitude: 41.9434241,
      longitude: -87.65518879999999
    }
  }, {
    uuid4: '0e791818-dde8-4a7e-ad15-767f93d2a55c',
    name: 'Masjid E Noor',
    url: 'https://www.northsidemosque.org/noor-masjid-chicago/',
    timeZoneId: 'America/Chicago',
    address: '6151 N Greenview Ave, Chicago, IL 60660, USA',
    placeId: 'ChIJFSgXGZjRD4gRz7P06vgb6XQ',
    geo: {
      latitude: 41.9942521,
      longitude: -87.6674718
    }
  }
]

exports.run = async () => {
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()
    await page.goto('https://ilmstudios.com/prayer-times')
    await page.waitForSelector('[role="gridcell"]')
    const pageHtml = await page.content()
    const $ = cheerio.load(pageHtml)
    ids.forEach(({ name }, i) => {
      const a = util.mapToText($, 'td', $(`div:contains("${name}")`).closest('tr').next())
      a.splice(3, 0, '-') // insert maghrib
      util.setTimes(ids[i], a)
    })
  } finally {
    await browser.close()
  }

  return ids
}
exports.ids = ids
