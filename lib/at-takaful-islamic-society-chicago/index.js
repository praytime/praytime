/* global XPathResult */
exports.apifySettings = {
  startUrls: [ { 'value': 'http://icconline.org/' } ],
  pageFunction: function pageFunction (context) {
    const date = new Date()
    const $ = context.jQuery
    const result = {
      results: [
        {
          uuid4: '65e107c8-b056-457a-a6f1-06280d6410f0',
          crawlTime: date,
          name: 'At-Takaful Islamic Society',
          url: 'http://icconline.org/',
          address: '5933 N Lincoln Ave, Chicago, IL 60659, USA',
          placeId: 'ChIJvbnzRRrOD4gRP2mO5m6be7E',
          timeZoneId: 'America/Chicago',
          geo: {
            latitude: 41.989204,
            longitude: -87.70492
          },
          fajrIqama: $('#masjidnow_widget-3 > div > table > tbody > tr:nth-child(2) > td.masjidnow-salah-time-iqamah.masjidnow-fajr').text().trim(),
          zuhrIqama: $('#masjidnow_widget-3 > div > table > tbody > tr:nth-child(4) > td.masjidnow-salah-time-iqamah.masjidnow-dhuhr').text().trim(),
          asrIqama: $('#masjidnow_widget-3 > div > table > tbody > tr:nth-child(5) > td.masjidnow-salah-time-iqamah.masjidnow-asr').text().trim(),
          maghribIqama: $('#masjidnow_widget-3 > div > table > tbody > tr:nth-child(6) > td.masjidnow-salah-time-iqamah.masjidnow-maghrib').text().trim(),
          ishaIqama: $('#masjidnow_widget-3 > div > table > tbody > tr:nth-child(7) > td.masjidnow-salah-time-iqamah.masjidnow-isha').text().trim(),
          juma1: document.evaluate('//*[@id="text-6"]/div/text()[2]', document, null, XPathResult.STRING_TYPE, null).stringValue.trim(),
          juma2: document.evaluate('//*[@id="text-6"]/div/text()[4]', document, null, XPathResult.STRING_TYPE, null).stringValue.trim()

        }
      ]
    }
    return result
  }.toString()
}
