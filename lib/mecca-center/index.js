const settings = {
    _id: "bBG5kmupgKJPssdeh",
    startUrls: [ { "value": "http://meccacenter.org" } ],
    pageFunction: function pageFunction(context) {
        var date = new Date();
        var $ = context.jQuery;
        var result = { 
            results: [
                {
                    crawlTime: date,
                    name: "MECCA Center",
                    url: "http://meccacenter.org",
                    address: "16W560 91st Street, Willowbrook, IL 60527",
                    geo: {
                        latitude: 41.724164, 
                        longitude:-87.948055
                    },
                    fajrIqama: $( "#dailyprayertime-4 > table > tbody > tr:nth-child(3) > td:nth-child(3)" ).first().text().trim(),
                    zuhrIqama: $( "#dailyprayertime-4 > table > tbody > tr:nth-child(5) > td:nth-child(3)" ).first().text().trim(),
                    asrIqama:  $( "#dailyprayertime-4 > table > tbody > tr:nth-child(6) > td:nth-child(3)" ).first().text().trim(),
                    maghribIqama: $( "#dailyprayertime-4 > table > tbody > tr:nth-child(7) > td:nth-child(3)" ).first().text().trim(),
                    ishaIqama: $( "#dailyprayertime-4 > table > tbody > tr:nth-child(8) > td:nth-child(3)" ).first().text().trim(),
                    juma1: "1:00 PM"
                }
            ]
        };
        return result; 
    }.toString()
}

exports.settings = settings

if (require.main === module) {
    const ApifyClient = require('apify-client')
    const apifyClient = new ApifyClient({ 
        userId: process.env.APIFY_USER_ID,
        token: process.env.APIFY_TOKEN
    })

    const lib = require('../')

    lib.getPagefunctionResults(apifyClient, settings, (r) => {
        console.log("%j", r)
    })
}

