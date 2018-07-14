const ApifyClient = require('apify-client')

const apifyClient = new ApifyClient({ 
    userId: process.env.APIFY_USER_ID,
    token: process.env.APIFY_TOKEN
})

const run = async (apifyClient, settings) => {
    try {
        const execution = await apifyClient.crawlers.startExecution({ 
            crawlerId: settings._id, 
            wait: 60,
            settings: settings
        });

        const results = await apifyClient.crawlers.getExecutionResults({ 
            executionId: execution._id 
        });

        if (results && results.items) {
            results.items.forEach((v) => {
                if (v.pageFunctionResult && v.pageFunctionResult.results) {
                    v.pageFunctionResult.results.forEach((r) => {
                        console.log("%j", r)
                    })
                } else {
                    console.error("empty pageFunctionResult")
                }
            });
        } else {
            console.error("empty results")
        }
    } catch (err) {
        console.error(err)
    }
}

const masaajid = [
    './masaajid/islamic-center-of-naperville',
    './masaajid/masjid-darussalam'
]
    
const main = async () => {
    masaajid.forEach( async (m) => {
        await run(apifyClient, require(m).settings)
    })
}

main()
