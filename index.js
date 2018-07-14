const masaajid = [
//    './lib/islamic-center-of-naperville',
    './lib/masjid-darussalam'
]

const ApifyClient = require('apify-client')
const apifyClient = new ApifyClient({
    userId: process.env.APIFY_USER_ID,
    token: process.env.APIFY_TOKEN
})

const lib = require('./lib')

masaajid.forEach((m) => {
    lib.getPagefunctionResults(apifyClient, require(m).settings, (r) => {
        console.log("%j", r)
    })
})
