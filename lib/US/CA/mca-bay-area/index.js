exports.apifySettings = {
  startUrls: [ { 'value': 'https://www.mcabayarea.org/' } ],
  pageFunction: function pageFunction (context) {
    const date = new Date()
    const $ = context.jQuery
    return {
      results: [
        {
          uuid4: '1b00962b-9568-4cee-95e2-ee2056c9ffbe',
          crawlTime: date,
          name: 'Muslim Community Association',
          url: 'https://www.mcabayarea.org/',
          address: '3003 Scott Blvd, Santa Clara, CA 95054, USA',
          placeId: 'ChIJY0jYD4jJj4ARPCSyL7wSOCM',
          timeZoneId: 'America/Los_Angeles',
          geo: {
            latitude: 37.376718,
            longitude: -121.959827
          }, // https://stackoverflow.com/a/40864295/8370398
          fajrIqama: $('#left > div.module.mod-box.mod-box-header.first > div.box-1 > div > div > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td.Prayer02 > br:nth-child(2)').get(0).nextSibling.nodeValue.trim(),
          zuhrIqama: $('#left > div.module.mod-box.mod-box-header.first > div.box-1 > div > div > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td.Prayer02 > br').get(0).nextSibling.nodeValue.trim(),
          asrIqama: $('#left > div.module.mod-box.mod-box-header.first > div.box-1 > div > div > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(4) > td.Prayer02 > br').get(0).nextSibling.nodeValue.trim(),
          maghribIqama: $('#left > div.module.mod-box.mod-box-header.first > div.box-1 > div > div > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(5) > td.Prayer02').text().trim(),
          ishaIqama: $('#left > div.module.mod-box.mod-box-header.first > div.box-1 > div > div > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(6) > td.Prayer02 > br').get(0).nextSibling.nodeValue.trim(),
          juma1: $('#left > div.module.mod-box.mod-box-header.first > div.box-1 > div > div > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(7) > td.Prayer02 > br').get(0).previousSibling.nodeValue.trim(),
          juma2: $('#left > div.module.mod-box.mod-box-header.first > div.box-1 > div > div > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(8) > td.Prayer02 > br').get(0).previousSibling.nodeValue.trim()
        },
        {
          uuid4: '9926fc63-5281-4aa9-9bc1-3aa96cf44ebb',
          crawlTime: date,
          name: 'Masjid Al-Noor',
          url: 'https://www.mcabayarea.org/',
          address: '1755 Catherine St, Santa Clara, CA 95050, USA',
          placeId: 'ChIJhY9EUU7Kj4ARX5CNKSkhU4Y',
          timeZoneId: 'America/Los_Angeles',
          geo: {
            latitude: 37.35044,
            longitude: -121.955431
          },
          fajrIqama: $('#left > div.module.mod-box.mod-box-header.first > div.box-1 > div > div > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td.Prayer03 > br:nth-child(2)').get(0).nextSibling.nodeValue.trim(),
          zuhrIqama: $('#left > div.module.mod-box.mod-box-header.first > div.box-1 > div > div > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td.Prayer03 > br').get(0).nextSibling.nodeValue.trim(),
          asrIqama: $('#left > div.module.mod-box.mod-box-header.first > div.box-1 > div > div > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(4) > td.Prayer03 > br').get(0).nextSibling.nodeValue.trim(),
          maghribIqama: $('#left > div.module.mod-box.mod-box-header.first > div.box-1 > div > div > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(5) > td.Prayer03').text().trim(),
          ishaIqama: $('#left > div.module.mod-box.mod-box-header.first > div.box-1 > div > div > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(6) > td.Prayer03 > br').get(0).nextSibling.nodeValue.trim(),
          juma1: $('#left > div.module.mod-box.mod-box-header.first > div.box-1 > div > div > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(7) > td.Prayer03 > br').get(0).previousSibling.nodeValue.trim(),
          juma2: $('#left > div.module.mod-box.mod-box-header.first > div.box-1 > div > div > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(8) > td.Prayer03 > br').get(0).previousSibling.nodeValue.trim()
        }
      ]
    }
  }.toString()
}
