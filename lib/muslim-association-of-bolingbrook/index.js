const settings = {
    _id: "bBG5kmupgKJPssdeh",
    startUrls: [ { "value": "http://bolingbrookmasjid.com/" } ],
    pageFunction: function pageFunction(context) {
        var date = new Date();
        var $ = context.jQuery;
        var fi =  $( "td:contains('FAJR') + td").text().trim()
        var zi =  $( "td:contains('ZUHR') + td").text().trim()
        var ai =  $( "td:contains('ASR') + td").text().trim()
        var mi =  $( "td:contains('MAGHRIB') + td").text().trim()
        var ii =  $( "td:contains('ISHA') + td").text().trim()
        var j1 =  $( "td:contains('1st Jumu') + td").text().trim()
        var j2 =  $( "td:contains('2nd Jumu') + td").text().trim()

        var result = { 
            results: [
                {
                    crawlTime: date,
                    name: "Masjid Al-Islam",
                    address: "560 E N Frontage Rd, Bolingbrook, IL 60440",
                    url: "https://bolingbrookmasjid.com",
                    geo: {
                        latitude: 41.698385, 
                        longitude:-88.044029
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
                    name: "Masjid Al-Jumu'ah",
                    address: "351 Veterans Pkwy, Bolingbrook, IL 60490",
                    url: "https://bolingbrookmasjid.com",
                    geo: {
                        latitude: 41.688226, 
                        longitude:-88.118169
                    },
                    fajrIqama: fi,
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

