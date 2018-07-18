const settings = {
    _id: "bBG5kmupgKJPssdeh",
    startUrls: [ { "value": "http://www.masjidhaqq.org" } ],
    pageFunction: function pageFunction(context) {
        const date = new Date();
        const t = [
            document.evaluate('//*[@id="primer-hero-text-2"]/div/p[1]/text()[2]', document, null, XPathResult.STRING_TYPE, null).stringValue.match(/\d{1,2}:\d{1,2}/)[0] + " AM",
            document.evaluate('//*[@id="primer-hero-text-2"]/div/p[1]/text()[3]', document, null, XPathResult.STRING_TYPE, null).stringValue.match(/\d{1,2}:\d{1,2}/)[0] + " PM",
            document.evaluate('//*[@id="primer-hero-text-2"]/div/p[1]/text()[4]', document, null, XPathResult.STRING_TYPE, null).stringValue.match(/\d{1,2}:\d{1,2}/)[0] + " PM",
            document.evaluate('//*[@id="primer-hero-text-2"]/div/p[1]/text()[5]', document, null, XPathResult.STRING_TYPE, null).stringValue.match(/:\s+(.*)/)[1],
            document.evaluate('//*[@id="primer-hero-text-2"]/div/p[1]/text()[6]', document, null, XPathResult.STRING_TYPE, null).stringValue.match(/\d{1,2}:\d{1,2}/)[0] + " PM",
            "1:00 PM",
        ]
        var result = { 
            results: [
                {
                    uuid4: "ec38b9ab-8b65-4b81-ab67-89c434fd1407",
                    crawlTime: date,
                    name: "Masjid Haqq",
                    url: "http://www.masjidhaqq.org",
                    address: "1620 S Highland, Lombard, IL 60148",
                    geo: {
                        latitude: 41.851883,
                        longitude: -88.012403,
                    },
                    fajrIqama: t[0],
                    zuhrIqama: t[1],
                    asrIqama:  t[2],
                    maghribIqama: t[3],
                    ishaIqama: t[4],
                    juma1: t[5],
                }
            ]
        };
        return result;
    }.toString()
}

exports.settings = settings
