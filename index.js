const ApifyClient = require('apify-client')

const apifyClient = new ApifyClient({ 
    userId: process.env.APIFY_USER_ID,
    token: process.env.APIFY_TOKEN
})

const m = require('./masaajid/masjid-darussalam')

m.run(apifyClient)
