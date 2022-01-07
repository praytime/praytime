const geofire = require('geofire-common')

// If true will not run puppeteer crawlers but still may output static data
const puppeteerDisabled = ('PUPPETEER_DISABLED' in process.env)
// If true will not run or output puppeteer crawler data
let skipPuppeteer = false
// If true will not output static data
let skipStatic = false

const argv = process.argv.slice(2)

for (; argv.length; argv.shift()) {
  if (!argv[0].startsWith('--')) {
    break
  }
  switch (argv[0]) {
    case '--skip-static':
      skipStatic = true
      break
    case '--skip-ppt':
      skipPuppeteer = true
      break
    default:
      console.error(`Unknown argument: ${argv[0]}`)
      process.exit(1)
  }
}

let masaajid = []

if (argv.length > 0) {
  // resolve relative module paths
  masaajid = argv.map(m => {
    try {
      return require.resolve(m)
    } catch (e) {
      if (e.code !== 'MODULE_NOT_FOUND' || m.startsWith('/') || m.startsWith('./')) {
        throw e
      }
      // try assuming it's a relative module path
      return require.resolve('./' + m)
    }
  })
} else {
  const lib = require('./lib')
  masaajid = lib.masaajid
}

const main = async () => {
  for (const masjid of masaajid) {
    try {
      console.error('starting %s', masjid)

      const masjidLib = require(masjid)

      let results = masjidLib.ids
      if (masjidLib.run) {
        if ((puppeteerDisabled || skipPuppeteer) && masjidLib.puppeteer) {
          console.error('skipping puppeteer crawler: %s', masjid)
          if (skipPuppeteer) {
            continue
          }
        } else {
          // generic run function
          results = await masjidLib.run()
        }
      } else if (skipStatic) {
        console.error('skipping static crawler: %s', masjid)
        continue
      } // else static crawler

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
