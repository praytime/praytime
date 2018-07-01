function pageFunction(context) {
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
                name: "Masjid Al-Islam",
                address: "560 E N Frontage Rd, Bolingbrook, IL 60440",
                url: "https://bolingbrookmasjid.com",
                geo: {
                    latitude: 41.6983307,
                    longitude: -88.0451163
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
                name: "Masjid Al-Jumu'ah",
                address: "351 Veterans Pkwy, Bolingbrook, IL 60490",
                url: "https://bolingbrookmasjid.com",
                geo: {
                    latitude: 41.6882016,
                    longitude: -88.1203472
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
