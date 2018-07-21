const settings = {
    _id: "bBG5kmupgKJPssdeh",
    startUrls: [ { "value": "http://masjidds.org/" } ],
    pageFunction: function pageFunction(context) {
        // called on every page the crawler visits, use it to extract data from it
        var $ = context.jQuery;
        var date = new Date();
        var result = {
            results: [
                {
                    name: "Masjid DarusSalam",
                    url: "http://masjidds.org",
                    address: "21W525 North Avenue, Lombard, IL 60148, USA",
                    timeZoneId: "America/Chicago",
                    uuid4: "1e948232-29be-48b2-bb74-5f645db0ae2d",
                    crawlTime: date,
                    placeId: "ChIJiUyP7EGtD4gR1VchuGB3JXE",
                    geo: {
                        latitude: 41.903020, 
                        longitude:-88.045350
                    },
                    fajrIqama: $( "td:contains('Iqamah') + td").text(),
                    zuhrIqama: $( "td:contains('Iqamah') ~ td:nth-child(4)").text(),
                    asrIqama: $( "td:contains('Iqamah') ~ td:nth-child(5)").text(),
                    maghribIqama: $( "td:contains('Iqamah') ~ td:nth-child(6)").text(),
                    ishaIqama: $( "td:contains('Iqamah') ~ td:nth-child(7)").text(),
                    juma1: $( "th:contains('First Jum') + td").text(),
                    juma2: $( "th:contains('Second Jum') + td").text()
                }
            ]
        };
        return result;
    }.toString()
}

exports.settings = settings
