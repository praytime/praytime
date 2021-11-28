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
  }, {
    uuid4: 'db5cd228-14e7-450a-8413-dc61f71ffa4b',
    name: 'Masjid E Suffah',
    url: 'http://suffaheducational.org/',
    timeZoneId: 'America/Chicago',
    address: '8201 Karlov Ave, Skokie, IL 60076, USA',
    placeId: 'ChIJpzftaKTPD4gRvWsNx2dABas',
    geo: {
      latitude: 42.0300367,
      longitude: -87.7302691
    }
  }, {
    uuid4: '726c5e39-a1d9-498e-898b-933afe40a5ba',
    name: 'Tahoora Masjid',
    url: 'http://www.salatomatic.com/spc/Chicago/Masjid-e-Tahoora/N0iLsOgaHp',
    timeZoneId: 'America/Chicago',
    address: '6534 N Seeley Ave, Chicago, IL 60645, USA',
    placeId: 'ChIJEZq7tsbRD4gRuFE2ZnQJLYc',
    geo: {
      latitude: 42.0007653,
      longitude: -87.68179099999999
    }
  }, {
    uuid4: '952a92a9-0ed0-4f39-9869-eb44070dd0c5',
    name: 'Sabeelur Rashaad Edu. Found.',
    url: 'http://www.sabeelurrashaad.org/',
    timeZoneId: 'America/Chicago',
    address: '3103 W Devon Ave, Chicago, IL 60659, USA',
    placeId: 'ChIJ33zKY8PPD4gRhK1jXpBnuL0',
    geo: {
      latitude: 41.997176,
      longitude: -87.70717499999999
    }
  }, {
    uuid4: '87becd04-cb6d-46e4-8330-b13f4fef1c6a',
    name: 'Masjid Rahmat',
    url: 'http://www.salatomatic.com/spc/Chicago/Masjid-e-Rahmat/cHhWnLVVWu',
    timeZoneId: 'America/Chicago',
    address: '6412 N Talman Ave, Chicago, IL 60645, USA',
    placeId: 'ChIJY5sOpN_RD4gRXE2bJOEvUhY',
    geo: {
      latitude: 41.99802,
      longitude: -87.696202
    }
  }, {
    uuid4: '0186ba9a-a7cd-4e4b-bd00-197f5ec34b29',
    name: 'Masjid Baitul Ateeq Learning Center',
    url: 'https://www.google.com/maps/search/?api=1&query=Masjid&query_place_id=ChIJX3GeQiDOD4gRugUe58vtJs4',
    timeZoneId: 'America/Chicago',
    address: '6404 N Fairfield Ave, Chicago, IL 60645, USA',
    placeId: 'ChIJX3GeQiDOD4gRugUe58vtJs4',
    geo: {
      latitude: 41.99790410000001,
      longitude: -87.69865329999999
    }
  }, {
    uuid4: '1d9d78ea-5ab7-4209-acb9-4259ca19a110',
    name: 'Masjed-e-Ayesha',
    url: 'https://www.turabi.org/',
    timeZoneId: 'America/Chicago',
    address: '2409 W Devon Ave, Chicago, IL 60659, USA',
    placeId: 'ChIJFe7XqN3RD4gR7DFHyMv0ECI',
    geo: {
      latitude: 41.9973567,
      longitude: -87.690158
    }
  }, {
    uuid4: '18c4debd-d2d7-4cad-839e-4fabd51b974f',
    name: 'Makkah Masjid',
    url: '',
    timeZoneId: 'America/Chicago',
    address: '6355 N Claremont Ave, Chicago, IL 60659, USA',
    placeId: 'ChIJW7-mQ5DRD4gRkyz8EGS7KcY',
    geo: {
      latitude: 41.99744620000001,
      longitude: -87.6884998
    }
  }, {
    uuid4: 'd25eb3dc-88c0-49f2-9562-64d8ab73535b',
    name: 'LMCC',
    url: 'http://www.islamicfinder.org/getitWorld.php?id=107858&lang=',
    timeZoneId: 'America/Chicago',
    address: '2150 W Devon Ave #1w, Chicago, IL 60659, USA',
    placeId: 'ChIJ89HgtMPRD4gRVbWPw8dwu34',
    geo: {
      latitude: 41.998028,
      longitude: -87.68457769999999
    }
  }, {
    uuid4: 'fa62ac03-248b-4cf9-aea9-4f8e4b197c21',
    name: 'Kaleemullah Masjid',
    url: 'http://kaleemullah-masjid.poi.place/',
    timeZoneId: 'America/Chicago',
    address: '4255 Main St, Skokie, IL 60076, USA',
    placeId: 'ChIJbf6N-6DPD4gR6wPlkCXPmfs',
    geo: {
      latitude: 42.033234,
      longitude: -87.734844
    }
  }, {
    uuid4: 'b5d95c95-bb2c-4549-8613-51f1a28f2c34',
    name: 'ICNA',
    url: 'http://www.icnachicago.org/',
    timeZoneId: 'America/Chicago',
    address: '6224 N California Ave, Chicago, IL 60659, USA',
    placeId: 'ChIJuUpXnh_OD4gROz4i4e6lwd4',
    geo: {
      latitude: 41.9947653,
      longitude: -87.6998205
    }
  }, {
    uuid4: '3e44291e-fa1a-451c-8cd8-38836108b675',
    name: 'Faizan Ul Quran',
    url: 'https://masjidal.com/timings/',
    timeZoneId: 'America/Chicago',
    address: '6412 N Hamilton Ave, Chicago, IL 60645, USA',
    placeId: 'ChIJhyDetcPRD4gRiNCymP2JsbA',
    geo: {
      latitude: 41.998272,
      longitude: -87.6840761
    }
  }, {
    uuid4: '3f7e50e7-7919-4e37-b06a-6f4665b719fe',
    name: 'Darus Sunnah',
    url: 'http://www.darussunnah.org/',
    address: '2045 Brown Ave, Evanston, IL 60201, USA',
    timeZoneId: 'America/Chicago',
    placeId: 'ChIJF3r0f1XFD4gR_s23BfkWigc',
    geo: {
      latitude: 42.055377,
      longitude: -87.699913
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
      util.setIqamaTimes(ids[i], a)
      if (a[5].length) {
        util.setJumaTimes(ids[i], util.matchTimeG(a[5]))
      }
    })
  } finally {
    await browser.close()
  }

  return ids
}
exports.ids = ids
