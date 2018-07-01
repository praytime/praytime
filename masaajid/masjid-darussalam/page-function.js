function pageFunction(context) {
    // called on every page the crawler visits, use it to extract data from it
    var $ = context.jQuery;
    var date = new Date();
    var result = {
        results: [
            {
                name: "Masjid DarusSalam",
                url: "http://masjidds.org",
                address: "21W525 North Avenue, Lombard, IL 60148",
                crawlTime: date,
                geo: {
                    latitude: 41.9030038,
                    longitude: -88.0475275
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
}
