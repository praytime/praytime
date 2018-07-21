const settings = {
    _id: "bBG5kmupgKJPssdeh",
    startUrls: [ { "value": "https://www.auroramasjid.org/" } ],
    pageFunction: function pageFunction(context) {
        const date = new Date()
        const $ = context.jQuery
        const result = {
            results: [
                {
                    uuid4: "7bc0c531-73b4-49ae-a25b-d7525f3a6104",
                    crawlTime: date,
                    name: "Fox Valley Muslim Community Center",
                    url: "https://www.auroramasjid.org/",
                    address: "1187 Timberlake Dr, Aurora, IL 60506, USA",
                    placeId: "ChIJpyouLQXlDogRbZ1oyLj1418",
                    timeZoneId: "America/Chicago",
                    geo: {
                        latitude: 41.780753,
                        longitude: -88.353097
                    },
                    fajrIqama: $( "#WRchTxt3 > h4:nth-child(2)" ).text().trim().match(/\d{1,2}:\d{1,2}/)[0] + " AM",
                    zuhrIqama: $( "#WRchTxt3 > h4:nth-child(3)" ).text().trim().match(/\d{1,2}:\d{1,2}/)[0] + " PM",
                    asrIqama: $( "#WRchTxt3 > h4:nth-child(4)" ).text().trim().match(/\d{1,2}:\d{1,2}/)[0] + " PM",
                    maghribIqama: $( "#WRchTxt3 > h4:nth-child(5)" ).text().trim(),
                    ishaIqama: $( "#WRchTxt3 > h4:nth-child(6)" ).text().trim().match(/\d{1,2}:\d{1,2}/)[0] + " PM",
                    juma1: $( "#WRchTxt3 > h4:nth-child(7)" ).text().trim().match(/\d{1,2}:\d{1,2}/)[0] + " PM",
                }
            ]
        }
        return result
    }.toString()
}

exports.settings = settings
