exports.apifySettings = {
  startUrls: [ { 'value': 'https://us.mohid.co/il/nwcs/isnschicago/masjid/widget/api/index/?m=prayertimings' } ],
  pageFunction: function pageFunction (context) {
    const date = new Date()
    const $ = context.jQuery
    const result = {
      results: [
        {
          uuid4: 'c295f191-1796-45a5-8f07-bc7e6d62c302',
          crawlTime: date,
          name: 'Islamic Society of Northwest Suburbs',
          url: 'http://www.isns.org/',
          address: '3950 Industrial Ave, Rolling Meadows, IL 60008, USA',
          placeId: 'ChIJj84qIiKlD4gRhLA-MMcAnAw',
          timeZoneId: 'America/Chicago',
          geo: {
            latitude: 42.096069,
            longitude: -88.031134
          },
          fajrIqama: $('#daily > div.list.roundtipR > ul > li:nth-child(1) > div.prayer_iqama_div').text().trim(),
          zuhrIqama: $('#daily > div.list.roundtipR > ul > li:nth-child(2) > div.prayer_iqama_div').text().trim(),
          asrIqama: $('#daily > div.list.roundtipR > ul > li:nth-child(3) > div.prayer_iqama_div').text().trim(),
          maghribIqama: $('#daily > div.list.roundtipR > ul > li:nth-child(4) > div.prayer_iqama_div').text().trim(),
          ishaIqama: $('#daily > div.list.roundtipR > ul > li:nth-child(5) > div.prayer_iqama_div').text().trim(),
          juma1: $('#jummah > div > ul > li:nth-child(1) > div.prayer_iqama_div').text().trim(),
          juma2: $('#jummah > div > ul > li:nth-child(3) > div.prayer_iqama_div').text().trim()
        }
      ]
    }
    return result
  }.toString()
}
