/* global XPathResult */
exports.apifySettings = {
  startUrls: [ { 'value': 'https://masjidalmustafa.weebly.com' } ],
  pageFunction: function pageFunction (context) {
    const date = new Date()
    const t = [
      document.evaluate('/html/body/div[1]/div[3]/div/div/div/div[1]/div/div/div/div[1]/text()[1]', document, null, XPathResult.STRING_TYPE, null).stringValue.match(/\d{1,2}:\d{1,2}/)[0] + ' AM',
      document.evaluate('/html/body/div[1]/div[3]/div/div/div/div[1]/div/div/div/div[1]/text()[2]', document, null, XPathResult.STRING_TYPE, null).stringValue.match(/\d{1,2}:\d{1,2}/)[0] + ' PM',
      document.evaluate('/html/body/div[1]/div[3]/div/div/div/div[1]/div/div/div/div[1]/text()[3]', document, null, XPathResult.STRING_TYPE, null).stringValue.match(/\d{1,2}:\d{1,2}/)[0] + ' PM',
      document.evaluate('/html/body/div[1]/div[3]/div/div/div/div[1]/div/div/div/div[1]/text()[4]', document, null, XPathResult.STRING_TYPE, null).stringValue.match(/:\s+(.*)/)[1],
      document.evaluate('/html/body/div[1]/div[3]/div/div/div/div[1]/div/div/div/div[1]/text()[5]', document, null, XPathResult.STRING_TYPE, null).stringValue.match(/\d{1,2}:\d{1,2}/)[0] + ' PM',
      document.evaluate('/html/body/div[1]/div[3]/div/div/div/div[1]/div/div/div/div[1]/text()[6]', document, null, XPathResult.STRING_TYPE, null).stringValue.match(/\d{1,2}:\d{1,2}/)[0] + ' PM'
    ]
    var result = {
      results: [
        {
          uuid4: '8aba0bd2-35b0-4550-bdee-c9d9feae5fd2',
          crawlTime: date,
          name: 'Masjid Al-Mustafa',
          url: 'https://masjidalmustafa.weebly.com',
          address: '300 E 55th St, Westmont, IL 60559, USA',
          timeZoneId: 'America/Chicago',
          placeId: 'ChIJw4fh4PtODogRC2F1kp2jYq0',
          geo: {
            latitude: 41.788639,
            longitude: -87.967464
          },
          fajrIqama: t[0],
          zuhrIqama: t[1],
          asrIqama: t[2],
          maghribIqama: t[3],
          ishaIqama: t[4],
          juma1: t[5]
        }
      ]
    }
    return result
  }.toString()
}
