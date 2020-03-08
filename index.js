let masaajid = [
  './lib/US/VA/adams-center',
  './lib/US/IL/aie-huntley',
  './lib/US/IL/al-hira-community-center-wooddale',
  './lib/US/NJ/al-minhaal-academy-new-jersey',
  './lib/US/IL/amco-lake-in-the-hills',
  './lib/US/IL/aqsa-community-center-plainfield',
  './lib/US/IL/at-takaful-islamic-society-chicago',
  './lib/US/VA/baitul-mukarram-arlington',
  './lib/US/TX/barakat-ul-quran-irving',
  './lib/US/IL/batavia-islamic-center',
  './lib/US/WA/bilal-islamic-center-everett',
  // './lib/US/IL/chicago-islamic-center',
  './lib/US/IL/chicago-mosque',
  './lib/US/IL/cimic',
  './lib/US/VA/dar-al-hijrah-va',
  './lib/US/MD/dar-al-taqwa-ellicot-city',
  './lib/US/VA/darul-huda-springfield',
  './lib/US/IL/darul-quran-chicago',
  './lib/US/MD/dar-us-salaam-college-park',
  './lib/US/IL/dar-us-sunnah-evanston',
  './lib/US/TX/deic-arlington',
  './lib/US/WA/dma-seattle',
  './lib/US/IL/downtown-islamic-center-chicago',
  // './lib/US/TX/duncanville-islamic-center',
  './lib/US/TX/east-plano-islamic-center',
  './lib/US/WA/emas-seattle',
  './lib/US/WA/farooq-masjid-mountlake-terrace',
  './lib/US/IL/fox-valley-muslim-community-center',
  './lib/US/TX/grand-prairie-islamic-society',
  './lib/US/TX/iacc-plano',
  './lib/US/IL/icc-des-plaines',
  './lib/US/IL/icci-chicago',
  './lib/US/TX/iccl-coppell-lewisville',
  './lib/US/WA/ick-kent',
  './lib/US/WA/icob-bothell',
  './lib/US/WA/icoe-bellevue',
  './lib/US/WA/icops-lynnwood',
  './lib/US/IL/ifn-libertyville',
  './lib/US/NJ/iscj-new-jersey',
  './lib/US/TX/islamic-association-of-allen',
  './lib/US/TX/islamic-association-of-fort-worth',
  './lib/US/TX/islamic-association-of-lewisville-flower-mound',
  './lib/US/TX/islamic-association-of-mid-cities-colleyville',
  './lib/US/TX/islamic-association-of-north-texas',
  './lib/US/MI/islamic-association-of-southwest-michigan',
  './lib/US/TX/islamic-association-of-tarrant-county',
  './lib/US/CA/islamic-center-of-contra-costa',
  './lib/US/TX/islamic-center-of-frisco',
  './lib/US/TX/islamic-center-of-irving',
  './lib/US/IL/islamic-center-of-naperville',
  './lib/US/VA/islamic-center-of-northern-virginia',
  './lib/US/IL/islamic-center-of-oakbrook-terrace',
  './lib/US/IL/islamic-center-of-romeoville',
  './lib/US/WA/islamic-center-of-tacoma',
  './lib/US/TX/islamic-center-of-watauga',
  './lib/US/IL/islamic-center-of-western-suburbs',
  './lib/US/IL/islamic-center-of-wheaton',
  './lib/US/IL/islamic-foundation-of-southwest-suburbs',
  './lib/US/IL/islamic-foundation-of-villa-park',
  './lib/US/TX/islamic-society-of-arlington-texas',
  './lib/US/MD/islamic-society-of-baltimore',
  './lib/US/DE/islamic-society-of-delaware',
  './lib/US/TX/islamic-society-of-denton',
  './lib/US/IL/isns-rolling-meadows',
  './lib/US/TX/keller-islamic-center',
  './lib/US/IL/light-of-islam-harvey',
  './lib/US/IL/madani-masjid-westmont',
  './lib/US/TX/madinah-masjid-of-carrollton',
  './lib/US/TX/makkah-masjid-garland',
  './lib/US/IL/makki-masjid-chicago',
  './lib/US/TX/mansfield-islamic-center-arlington',
  './lib/US/WA/maps-redmond',
  './lib/US/IL/masjid-al-jameel-addison-il',
  './lib/US/IL/masjid-al-huda-schaumburg',
  './lib/US/TX/masjid-al-islam-dallas',
  './lib/US/IL/masjid-al-mustafa-westmont',
  './lib/US/WA/masjid-al-nur-olympia',
  './lib/US/TX/masjid-dar-alhuda-hurst',
  './lib/US/IL/masjid-darussalam',
  './lib/US/IL/masjid-haqq-lombard',
  './lib/US/WA/masjid-madeena-bellevue',
  './lib/US/TX/masjid-salahadeen-plano',
  './lib/US/IL/masjid-tawheed-chicago',
  './lib/US/IL/masjid-ul-islam-elgin',
  './lib/US/IL/masjid-uthman-lombard',
  './lib/US/TX/mas-youth-center-dallas',
  './lib/US/CA/mca-bay-area',
  './lib/US/IL/mcc-chicago',
  './lib/US/CA/mcc-east-bay-pleasanton',
  './lib/US/MD/mcc-silver-springs',
  './lib/US/TX/mckinney-islamic-association',
  './lib/US/VA/mclean-islamic-center-va',
  './lib/US/NJ/mcmc-new-jersey',
  './lib/US/IL/mecca-center',
  './lib/US/TX/mesquite-islamic-center',
  // './lib/US/IL/mosque-foundation-bridgeview', // puppeteer
  './lib/US/IL/muslim-association-of-bolingbrook',
  './lib/US/IL/muslim-society-inc-bloomingdale',
  './lib/US/VA/mustafa-center-va',
  './lib/US/NJ/new-brunswick-islamic-center-new-jersey',
  './lib/US/TX/noori-masjid-plano',
  './lib/US/MD/pgma-lanham',
  './lib/US/IL/prayer-center-of-orland-park',
  './lib/US/WA/sammamish-mosque',
  // './lib/US/CA/san-ramon-valley-islamic-center', // puppeteer
  './lib/US/IL/shariaboard-chicago',
  './lib/US/WA/snoqualmie-mosque',
  './lib/US/TX/tyler-islamic-center',
  './lib/US/TX/valley-ranch-islamic-center',
  './lib/US/TX/wylie-musallah',
  './lib/US/TX/zia-ul-quran-arlington'
]

const main = async () => {
  for (const masjid of masaajid) {
    try {
      console.error('starting %s', masjid)

      const masjidLib = require(masjid)

      let results = {}
      if (masjidLib.apifySettings) {
        console.error('skipping apify crawler: %s', masjid)
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
      console.error('caught error processing ' + masjid + ':' + err)
      console.trace()
    }
  }
}

const argv = process.argv.slice(2)

if (argv.length > 0) {
  masaajid = argv
}

main()
