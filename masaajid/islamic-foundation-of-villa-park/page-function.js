function pageFunction(context) {
    var date = new Date();
    var $ = context.jQuery;
    var result = { 
        results: [
            {
                crawlTime: date,
                name: "Islamic Foundation",
                url: "http://www.islamicfoundation.org/",
                address: "300 W. Highridge Road, Villa Park, IL 60181",
                geo: {
                    latitude: 41.867930, 
                    longitude:-87.985824
                },
                fajrIqama: $( "#daily > div.list.plusG > ul > li:nth-child(1) > div.prayer_iqama_div" ).first().text().trim(),
                zuhrIqama: $( "#daily > div.list.plusG > ul > li:nth-child(2) > div.prayer_iqama_div" ).first().text().trim(),
                asrIqama:  $( "#daily > div.list.plusG > ul > li:nth-child(3) > div.prayer_iqama_div" ).first().text().trim(),
                maghribIqama: $( "#daily > div.list.plusG > ul > li:nth-child(4) > div.prayer_iqama_div" ).first().text().trim(),
                ishaIqama: $( "#daily > div.list.plusG > ul > li:nth-child(5) > div.prayer_iqama_div" ).first().text().trim(),
                juma1: $( "#jummah > div > ul > li:nth-child(1) > div.prayer_iqama_div" ).first().text().trim(),
                juma2: $( "#jummah > div > ul > li:nth-child(3) > div.prayer_iqama_div" ).first().text().trim()
            }
        ]
    };
    return result; 
}
