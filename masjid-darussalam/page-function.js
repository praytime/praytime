function pageFunction(context) {
    // called on every page the crawler visits, use it to extract data from it
    var $ = context.jQuery;
    var result = {
        protocol: 1,
        locations: [],
        date: '',
        fajr: $( "td:contains('Iqamah') + td").text(),
        zuhr: $( "td:contains('Iqamah') ~ td:nth-child(4)").text(),
        asr: $( "td:contains('Iqamah') ~ td:nth-child(5)").text(),
        maghrib: $( "td:contains('Iqamah') ~ td:nth-child(6)").text(),
        isha: $( "td:contains('Iqamah') ~ td:nth-child(7)").text(),
        jummah1: $( "th:contains('First Jum') + td").text(),
        jummah2: $( "th:contains('Second Jum') + td").text()
    };
    return result;
}
