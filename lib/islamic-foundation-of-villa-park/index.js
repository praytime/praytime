exports.apifySettings = {
  _id: 'bBG5kmupgKJPssdeh',
  startUrls: [ { 'value': 'https://us.mohid.co/il/swcs/ifsvp/masjid/widget/api/index/?m=prayertimings' } ],
  pageFunction: function pageFunction (context) {
    var date = new Date()
    var $ = context.jQuery
    var result = {
      results: [
        {
          uuid4: '54ebe774-8fb6-4bbd-8824-fa4b0167d766',
          crawlTime: date,
          name: 'Islamic Foundation',
          url: 'http://www.islamicfoundation.org/',
          address: '300 W. Highridge Road, Villa Park, IL 60181, USA',
          timeZoneId: 'America/Chicago',
          placeId: 'ChIJf-nwNglNDogRCZYLGS4_dKE',
          geo: {
            latitude: 41.867930,
            longitude: -87.985824
          },
          fajrIqama: $('#daily > div.list.plusG > ul > li:nth-child(1) > div.prayer_iqama_div').first().text().trim(),
          zuhrIqama: $('#daily > div.list.plusG > ul > li:nth-child(2) > div.prayer_iqama_div').first().text().trim(),
          asrIqama: $('#daily > div.list.plusG > ul > li:nth-child(3) > div.prayer_iqama_div').first().text().trim(),
          maghribIqama: $('#daily > div.list.plusG > ul > li:nth-child(4) > div.prayer_iqama_div').first().text().trim(),
          ishaIqama: $('#daily > div.list.plusG > ul > li:nth-child(5) > div.prayer_iqama_div').first().text().trim(),
          juma1: $('#jummah > div > ul > li:nth-child(1) > div.prayer_iqama_div').first().text().trim(),
          juma2: $('#jummah > div > ul > li:nth-child(3) > div.prayer_iqama_div').first().text().trim()
        }
      ]
    }
    return result
  }.toString()
}
