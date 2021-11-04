const geofire = require('geofire-common')
const usLib = require('./lib/US')
let masaajid = usLib.masaajid

const argv = process.argv.slice(2)

if (argv.length > 0) {
  masaajid = argv
}

const puppeteerDisabled = ('PUPPETEER_DISABLED' in process.env)

const main = async () => {
  for (const masjid of masaajid) {
    try {
      console.error('starting %s', masjid)

      const masjidLib = require(masjid)

      let results = masjidLib.ids
      if (masjidLib.run) {
        if (puppeteerDisabled && masjidLib.puppeteer) {
          console.error('skipping puppeteer crawler: %s', masjid)
        } else {
          // generic run function
          results = await masjidLib.run()
        }
      }

      results.forEach((r) => {
        r.crawlTime = new Date()
        r.geohash = geofire.geohashForLocation([r.geo.latitude, r.geo.longitude])
        console.log('%j', r)
      })
    } catch (err) {
      console.error('caught error processing %s:', masjid, err)
    }
  }
}

main()
