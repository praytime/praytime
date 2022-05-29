const path = require('path')
const geofire = require('geofire-common')
const util = require('./lib/util')

// If true will not run puppeteer crawlers but still may output static data
const puppeteerDisabled = ('PUPPETEER_DISABLED' in process.env)
// If true will not run or output puppeteer crawler data
let skipPuppeteer = false
// If true will not output static data
let skipStatic = false
// If true will not dump all static data and ignore other options
let dump = false

const argv = process.argv.slice(2)

for (; argv.length; argv.shift()) {
  if (!argv[0].startsWith('--')) {
    break
  }
  switch (argv[0]) {
    case '--dump':
      dump = true
      break
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

const masaajid = ((argv) => {
  if (argv.length > 0) {
    // resolve relative module paths
    return argv.map(m => {
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
    return require('./lib').masaajid
  }
})(argv)
  .map((absLibPath) => './' + path.relative(__dirname, absLibPath))

if (dump) {
  console.log('%j', masaajid.map(require)
    .map(masjidLib => masjidLib.ids.map(id => ({
      name: id.name,
      url: id.url,
      geo: [id.geo.latitude, id.geo.longitude],
      geohash: geofire.geohashForLocation([id.geo.latitude, id.geo.longitude])
    })
    ))
    .reduce((a, b) => a.concat(b))
  )
  process.exit(0)
}

// async iife to run crawlers
(async () => {
  for (const masjid of util.shuffle(masaajid)) {
    try {
      const masjidLib = require(masjid)

      const crawlResults = masjidLib.ids
      let crawlError = ''
      if (masjidLib.run) {
        if ((puppeteerDisabled || skipPuppeteer) && masjidLib.puppeteer) {
          console.error('skipping puppeteer crawler: %s', masjid)
          if (skipPuppeteer) {
            continue
          }
        } else {
          try {
            // generic run function
            await masjidLib.run()
          } catch (err) {
            crawlError = err.toString()
          }
        }
      } else if (skipStatic) {
        console.error('skipping static crawler: %s', masjid)
        continue
      } // else static crawler

      crawlResults.forEach((r) => {
        r.crawlTime = new Date()
        r.geohash = geofire.geohashForLocation([r.geo.latitude, r.geo.longitude])
        console.log('%j', {
          result: r,
          error: crawlError,
          source: masjid
        })
      })
    } catch (err) {
      console.error('caught error processing %s:', masjid, err)
    }
  }
})()
