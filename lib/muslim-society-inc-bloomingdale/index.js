const settings = {
    _id: "bBG5kmupgKJPssdeh",
    startUrls: [ { "value": "https://us.mohid.co/il/nwcs/msi/masjid/widget/api/index/?m=prayertimings" } ],
    pageFunction: function pageFunction(context) {
        var date = new Date();
        var $ = context.jQuery;
        var result = { 
            results: [
                {
                    uuid4: "f1da0fa7-6043-4f7c-b319-49ecc9fe0087",
                    crawlTime: date,
                    name: "Muslim Society Inc",
                    url: "http://www.muslimsocietyinc.org/",
                    address: "1785 Bloomingdale Rd., Glendale Heights, IL 60139, USA",
                    placeId: "ChIJ_9tTBZisD4gRB8UhMdNO4zM",
                    timeZoneId: "America/Chicago",
                    geo: {
                        latitude: 41.9240867, 
                        longitude: -88.08072500000002
                    },
                    fajrIqama: $( "#daily > div.list.plusG > ul > li:nth-child(1) > div.prayer_iqama_div" ).text().trim(),
                    zuhrIqama: $( "#daily > div.list.plusG > ul > li:nth-child(2) > div.prayer_iqama_div" ).text().trim(),
                    asrIqama:  $( "#daily > div.list.plusG > ul > li:nth-child(3) > div.prayer_iqama_div" ).text().trim(),
                    maghribIqama: $( "#daily > div.list.plusG > ul > li:nth-child(4) > div.prayer_iqama_div" ).text().trim(),
                    ishaIqama: $( "#daily > div.list.plusG > ul > li:nth-child(5) > div.prayer_iqama_div" ).text().trim(),
                    juma1: $( "#jummah > div > ul > li:nth-child(1) > div.prayer_iqama_div" ).text().trim(),
                    juma2: $( "#jummah > div > ul > li:nth-child(2) > div.prayer_iqama_div" ).text().trim()
                }
            ]
        };
        return result; 
    }.toString()
}

exports.settings = settings
