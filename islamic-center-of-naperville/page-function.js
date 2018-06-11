function pageFunction(context) { 
    var $ = context.jQuery;
    var result = { 
        protocol: 1, 
        locations: [], 
        date: '', 
        fajr: $( "td:contains('Fajr') + td").text(), 
        zuhr: $( "td:contains('Dhuhr') + td").text(), 
        asr: $( "td:contains('Asr') + td").text(), 
        maghrib: $( "td:contains('Maghrib') + td").text(), 
        isha: $( "td:contains('Isha') + td").text(), 
        jummah1: $( "td:contains('1st Khutbah') + td").text(), 
        jummah2: $( "td:contains('2nd Khutbah') + td").text()
    }; 
    return result; 
}
