const ApifyClient = require('apify-client')
const apifyClient = new ApifyClient({
  userId: process.env.APIFY_USER_ID,
  token: process.env.APIFY_TOKEN
})
const lib = require('./lib')

let masaajid = [
  './lib/batavia-islamic-center',
  './lib/fox-valley-muslim-community-center',
  './lib/islamic-center-of-naperville',
  './lib/islamic-center-of-oakbrook-terrace',
  './lib/islamic-center-of-romeoville',
  './lib/islamic-center-of-wheaton',
  './lib/islamic-foundation-of-southwest-suburbs',
  './lib/islamic-foundation-of-villa-park',
  './lib/madani-masjid-westmont',
  './lib/masjid-al-mustafa-westmont',
  './lib/masjid-darussalam',
  './lib/masjid-haqq-lombard',
  './lib/masjid-uthman-lombard',
  './lib/mcc-chicago',
  './lib/mecca-center',
  './lib/muslim-association-of-bolingbrook',
  './lib/muslim-society-inc-bloomingdale'
]

const main = async () => {
  for (const masjid of masaajid) {
    try {
      console.error('starting %s', masjid)

      const masjidLib = require(masjid)

      let results = {}
      if (masjidLib.apifySettings) {
        // run an apify crawler
        results = await lib.getPagefunctionResults(apifyClient, masjidLib.apifySettings)
      } else if (masjidLib.run) {
        // generic run function
        results = await masjidLib.run()
      } else if (masjidLib.results) {
        // static results, nothing to execute
        results = masjidLib.results
      }

      results.forEach((r) => {
        console.log('%j', r)
      })
    } catch (err) {
      console.error(err)
    }
  }
}

const argv = process.argv.slice(2)

if (argv.length > 0) {
  masaajid = argv
}

main()
