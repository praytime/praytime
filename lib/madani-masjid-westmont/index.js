const settings = {
    _id: "bBG5kmupgKJPssdeh",
    startUrls: [ { "value": "https://www.madanimasjid.org/prayer-times/" } ],
    pageFunction: function pageFunction(context) {
        var date = new Date();
        var $ = context.jQuery;
        var result = { 
            results: [
                {
                    uuid4: "2761a944-e1bc-4d85-8581-55a4d7536ce2",
                    crawlTime: date,
                    name: "Madani Masjid",
                    url: "https://www.madanimasjid.org",
                    address: "40 North Lincoln Street, Westmont, IL, 60559",
                    geo: {
                        latitude: 41.797492, 
                        longitude:-87.977081
                    },
                    fajrIqama: $( "#block-5253c8cd4f5fc1682e57 > div > p:nth-child(4)" ).first().text().trim(),
                    zuhrIqama: $( "#block-5253c8cd4f5fc1682e57 > div > p:nth-child(5)" ).first().text().trim(),
                    asrIqama:  $( "#block-5253c8cd4f5fc1682e57 > div > p:nth-child(6)" ).first().text().trim(),
                    maghribIqama: $( "#block-5253c8cd4f5fc1682e57 > div > p:nth-child(7)" ).first().text().trim(),
                    ishaIqama: $( "#block-5253c8cd4f5fc1682e57 > div > p:nth-child(8)" ).first().text().trim(),
                    juma1: $( "#block-5253c8cd4f5fc1682e57 > div > p:nth-child(10)" ).first().text().trim(),
                }
            ]
        };
        return result; 
    }.toString()
}

exports.settings = settings
