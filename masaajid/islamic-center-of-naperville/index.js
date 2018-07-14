const settings = {
    _id: "bBG5kmupgKJPssdeh",
    startUrls: [ { "value": "http://islamiccenterofnaperville.org/" } ],
    pageFunction: function pageFunction(context) {
        var date = new Date();
        var $ = context.jQuery;
        var fi =  $( "td:contains('Fajr')" ).first().next( "td" ).text()
        var foi = $( "td:contains('Fajr at Olesen')" ).first().next( "td" ).text()
        var zi =  $( "td:contains('Dhuhr') + td").text()
        var ai =  $( "td:contains('Asr') + td").text()
        var mi =  $( "td:contains('Maghrib') + td").text()
        var ii =  $( "td:contains('Isha') + td").text()
        var j1 =  $( "td:contains('1st Khutbah') + td").text()
        var j2 =  $( "td:contains('2nd Khutbah') + td").text()

        var result = { 
            results: [
                {
                    crawlTime: date,
                    name: "ICN Al-Hilal (Ogden)",
                    url: "https://islamiccenterofnaperville.org",
                    address: "2844 West Ogden Ave, Naperville IL, 60540",
                    geo: {
                        latitude: 41.753939, 
                        longitude:-88.201674
                    },
                    fajrIqama: fi,
                    zuhrIqama: zi,
                    asrIqama: ai,
                    maghribIqama: mi,
                    ishaIqama: ii,
                    juma1: j1,
                    juma2: j2
                },
                {
                    crawlTime: date,
                    name: "ICN Al-Hidayah (Olesen)",
                    url: "https://islamiccenterofnaperville.org",
                    address: "450 Olesen Dr, Naperville, IL 60540",
                    geo: {
                        latitude: 41.768294, 
                        longitude:-88.120147
                    },
                    fajrIqama: foi,
                    zuhrIqama: zi,
                    asrIqama: ai,
                    maghribIqama: mi,
                    ishaIqama: ii,
                    juma1: j1,
                    juma2: j2
                }
            ]
        }; 
        return result; 
    }.toString()
}

const run = async (apifyClient) => {
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

exports.settings = settings
exports.run = run

if (require.main === module) {
    const ApifyClient = require('apify-client')

    const apifyClient = new ApifyClient({ 
        userId: process.env.APIFY_USER_ID,
        token: process.env.APIFY_TOKEN
    })

    run(apifyClient)
}
