const ApifyClient = require('apify-client')
const apifyClient = new ApifyClient({
    userId: process.env.APIFY_USER_ID,
    token: process.env.APIFY_TOKEN
})
const lib = require('./lib')

const masaajid = [
    './lib/islamic-center-of-naperville',
    './lib/islamic-center-of-romeoville',
    './lib/islamic-center-of-wheaton',
    './lib/islamic-foundation-of-villa-park',
    './lib/madani-masjid-westmont',
    './lib/masjid-al-mustafa-westmont',
    './lib/masjid-darussalam',
    './lib/mcc-chicago',
    './lib/mecca-center',
    './lib/muslim-association-of-bolingbrook',
]

let masjidIdx = 0

function run() {
    let masjid = masaajid[masjidIdx++]
    console.error("starting %s", masjid)
    lib.getPagefunctionResults(apifyClient, require(masjid).settings, (r) => {
        console.log("%j", r)
    })
    if (masjidIdx < masaajid.length) {
        // delay before starting next
        setTimeout(run, 20000)
    }
}

console.log(process.env)

if (process.env.APIFY_DEFAULT_KEY_VALUE_STORE_ID) {
    console.error("actor mode")
    // in actor environment
    const keyValueStores = apifyClient.keyValueStores
    keyValueStores.getRecord({ 
        storeId: process.env.APIFY_DEFAULT_KEY_VALUE_STORE_ID, 
        key: "INPUT"
    })
        .then((input) => {
            console.error("got input")
            console.error(input)
            if (input.jsonFiles) {
                const fs = require('fs');
                Object.keys(input.jsonFiles).forEach((key) => {
                    console.error("Writing %s", key)
                    fs.writeFileSync(key, JSON.stringify(input.jsonFiles[key]))
                })
            }
            run()
        })
        .catch((err) => {
            console.error(err)
        })
} else {
    console.error("console mode")
    // kick off loop
    run()
}
