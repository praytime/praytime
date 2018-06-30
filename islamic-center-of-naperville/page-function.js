function pageFunction(context) {
    var $ = context.jQuery;
    var fi =  $( "td:contains('Fajr') + td").text()
    var zi =  $( "td:contains('Dhuhr') + td").text()
    var ai =  $( "td:contains('Asr') + td").text()
    var mi =  $( "td:contains('Maghrib') + td").text()
    var ii =  $( "td:contains('Isha') + td").text()
    var j1 =  $( "td:contains('1st Khutbah') + td").text()
    var j2 =  $( "td:contains('2nd Khutbah') + td").text()

    var result = { 
        results: [
            {
                name: "Islamic Center of Naperville - Ogden",
                url: "https://islamiccenterofnaperville.org",
                geo: {
                    latitude: 41.7540917,
                    longitude: -88.202011
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
                name: "Islamic Center of Naperville - Olesen",
                url: "https://islamiccenterofnaperville.org",
                geo: {
                    latitude: 41.7682887,
                    longitude: -88.1223378
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
}
