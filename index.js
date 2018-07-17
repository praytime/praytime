const ApifyClient = require('apify-client')
const apifyClient = new ApifyClient({
    userId: process.env.APIFY_USER_ID,
    token: process.env.APIFY_TOKEN
})
const lib = require('./lib')

let masaajid = [
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

const main = async () => {
    for (const masjid of masaajid) {
        try {
            console.error("starting %s", masjid)
            const results = await lib.getPagefunctionResults(apifyClient, require(masjid).settings)

            results.forEach((r) => {
                console.log("%j", r)
            });
        } catch (err) {
            console.error(err)
        }
    }
}

const argv = process.argv.slice(2);

if (argv.length > 0) {
    masaajid = argv
} 

main()
