exports.apifySettings = {
  _id: 'bBG5kmupgKJPssdeh',
  startUrls: [ { 'value': 'https://www.madanimasjid.org/prayer-times/' } ],
  pageFunction: function pageFunction (context) {
    const date = new Date()
    const $ = context.jQuery
    const t = [
      $('#block-5253c8cd4f5fc1682e57 > div > p:nth-child(4)').first().text().match(/\d{1,2}:\d{1,2}/)[0] + ' AM',
      $('#block-5253c8cd4f5fc1682e57 > div > p:nth-child(5)').first().text().match(/\d{1,2}:\d{1,2}/)[0] + ' PM',
      $('#block-5253c8cd4f5fc1682e57 > div > p:nth-child(6)').first().text().match(/\d{1,2}:\d{1,2}/)[0] + ' PM',
      $('#block-5253c8cd4f5fc1682e57 > div > p:nth-child(7)').first().text().match(/:\s+(.*)/)[1],
      $('#block-5253c8cd4f5fc1682e57 > div > p:nth-child(8)').first().text().match(/\d{1,2}:\d{1,2}/)[0] + ' PM',
      $('#block-5253c8cd4f5fc1682e57 > div > p:nth-child(10)').first().text().match(/\d{1,2}:\d{1,2}/)[0] + ' PM'
    ]
    var result = {
      results: [
        {
          uuid4: '2761a944-e1bc-4d85-8581-55a4d7536ce2',
          crawlTime: date,
          name: 'Madani Masjid',
          url: 'https://www.madanimasjid.org',
          address: '40 North Lincoln Street, Westmont, IL, 60559, USA',
          timeZoneId: 'America/Chicago',
          placeId: 'ChIJVVXlUllODogRulXf-qOuXyw',
          geo: {
            latitude: 41.797492,
            longitude: -87.977081
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
