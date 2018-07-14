exports.getPagefunctionResults = async (apifyClient, settings, cb) => {
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
                        // console.log("%j", r)
                        cb(r)
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

