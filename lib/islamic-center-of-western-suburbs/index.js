exports.apifySettings = {
  startUrls: [ { 'value': 'http://www.icwsmasjid.org/' } ],
  pageFunction: function pageFunction (context) {
    const date = new Date()
    const $ = context.jQuery
    const result = {
      results: [
        {
          uuid4: 'aad361ea-8f99-4cac-aec4-399249439cce',
          crawlTime: date,
          name: 'Islamic Center of Western Suburbs',
          url: 'http://www.icwsmasjid.org/',
          address: '28W774 Army Trail Rd, West Chicago, IL 60185, USA',
          placeId: 'ChIJh8IdCooAD4gRzjD0rNJ1OTY',
          timeZoneId: 'America/Chicago',
          geo: {
            latitude: 41.944168,
            longitude: -88.184075
          },
          fajrIqama: $('#JamaatTiming > div.col.span_12.dark.left > div > div > div > div > div.row.pricing-table.five-cols > div:nth-child(1) > div > h4').text().trim().match(/\d{1,2}:\d{1,2}/)[0] + ' AM',
          zuhrIqama: $('#JamaatTiming > div.col.span_12.dark.left > div > div > div > div > div.row.pricing-table.five-cols > div:nth-child(2) > div > h4').text().trim().match(/\d{1,2}:\d{1,2}/)[0] + ' PM',
          asrIqama: $('#JamaatTiming > div.col.span_12.dark.left > div > div > div > div > div.row.pricing-table.five-cols > div:nth-child(3) > div > h4').text().trim().match(/\d{1,2}:\d{1,2}/)[0] + ' PM',
          maghribIqama: $('#JamaatTiming > div.col.span_12.dark.left > div > div > div > div > div.row.pricing-table.five-cols > div:nth-child(4) > div > h4').text().trim(),
          ishaIqama: $('#JamaatTiming > div.col.span_12.dark.left > div > div > div > div > div.row.pricing-table.five-cols > div:nth-child(5) > div > h4').text().trim().match(/\d{1,2}:\d{1,2}/)[0] + ' PM'
        }
        // TODO: juma at separate location
      ]
    }
    return result
  }.toString()
}
