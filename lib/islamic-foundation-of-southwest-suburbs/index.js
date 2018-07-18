const settings = {
    _id: "bBG5kmupgKJPssdeh",
    // startUrls: [ { "value": "http://masjidal.com/ifsws" } ],
    startUrls: [ { "value": "http://ifsws.org" } ],
    pageFunction: function pageFunction(context) {
        const date = new Date();
        const $ = context.jQuery;
        const t = [
            $( "#custom_html-4 > div > div > iframe > #fajr > td.iqama"  ).first().text(),
            $( "#custom_html-4 > div > div > iframe > #zuhr > td.iqama"  ).first().text(),
            $( "#custom_html-4 > div > div > iframe > #asr > td.iqama"  ).first().text(),
            $( "#custom_html-4 > div > div > iframe > #maghrib > td.iqama"  ).first().text(),
            $( "#custom_html-4 > div > div > iframe > #isha > td.iqama"  ).first().text(),
            $( "#custom_html-4 > div > div > iframe > #jummah1 > td.salah" ).first().text(),
        ]

        var result = { 
            results: [
                {
                    uuid4: "7d5464b4-d759-4306-a865-f7dbe6744146",
                    crawlTime: date,
                    name: "Islamic Foundation of Southwest Suburbs",
                    url: "http://ifsws.org/",
                    address: "23616 W Main St, Plainfield, IL 60544",
                    geo: {
                        latitude: 41.618267,
                        longitude: -88.193512
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
