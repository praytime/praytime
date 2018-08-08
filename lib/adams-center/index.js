const axios = require('axios')
const cheerio = require('cheerio')

exports.run = async () => {
  const date = new Date()

  const [salahResp, jumuaResp] = await Promise.all([
    axios.get('https://www.adamscenter.org/salat_times.php'),
    axios.get('https://www.adamscenter.org/jummah-friday-prayer-satellites-info/')
  ])

  const s = cheerio.load(salahResp.data)
  const j = cheerio.load(jumuaResp.data)

  return [
    {
      date: date,
      uuid4: '1f858dc7-182a-48e7-b9f3-b0849703f22a',
      name: 'ADAMS Sterling',
      url: 'https://www.adamscenter.org',
      address: '46903 Sugarland Rd, Sterling, VA 20164, USA',
      timeZoneId: 'America/New_York',
      placeId: 'ChIJc6S_TtU5tokRgk_TpO3j3Kw',
      geo: {
        latitude: 39.006404,
        longitude: -77.379375
      },
      fajrIqama: s('#wp-calendar > tbody > tr:nth-child(1) > td:nth-child(3)').text(),
      zuhrIqama: s('#wp-calendar > tbody > tr:nth-child(3) > td:nth-child(3)').text(),
      asrIqama: s('#wp-calendar > tbody > tr:nth-child(4) > td:nth-child(3)').text(),
      maghribIqama: s('#wp-calendar > tbody > tr:nth-child(5) > td:nth-child(3)').text(),
      ishaIqama: s('#wp-calendar > tbody > tr:nth-child(6) > td:nth-child(3)').text(),
      juma1: j("td:contains('ADAMS Sterling') + td > div:nth-child(1) > div > div > div > div:nth-child(1)").text().trim(),
      juma2: j("td:contains('ADAMS Sterling') + td > div:nth-child(1) > div > div > div > div:nth-child(2)").text().trim(),
      juma3: j("td:contains('ADAMS Sterling') + td > div:nth-child(1) > div > div > div > div:nth-child(3)").text().trim()
    },
    {
      date: date,
      uuid4: '4b293ef0-14a0-41b7-9801-e7c6e6ff7e09',
      name: 'ADAMS Ashburn',
      url: 'https://www.adamscenter.org',
      address: '21740 Beaumeade Cir STE 100, Ashburn, VA 20147, USA',
      timeZoneId: 'America/New_York',
      placeId: 'ChIJK8JfXCY5tokRFka3F-HAnFU',
      geo: {
        latitude: 39.018021,
        longitude: -77.456387
      },
      fajrIqama: s('#wp-calendar > tbody > tr:nth-child(1) > td:nth-child(3)').text(),
      zuhrIqama: s('#wp-calendar > tbody > tr:nth-child(3) > td:nth-child(3)').text(),
      asrIqama: s('#wp-calendar > tbody > tr:nth-child(4) > td:nth-child(3)').text(),
      maghribIqama: s('#wp-calendar > tbody > tr:nth-child(5) > td:nth-child(3)').text(),
      ishaIqama: s('#wp-calendar > tbody > tr:nth-child(6) > td:nth-child(3)').text(),
      juma1: j("td:contains('21740 Beaumeade Circle') + td > div:nth-child(1)").text().trim(),
      juma2: j("td:contains('21740 Beaumeade Circle') + td > div:nth-child(2)").text().trim(),
      juma3: j("td:contains('21740 Beaumeade Circle') + td > div:nth-child(3)").text().trim()
    },
    {
      date: date,
      uuid4: '81698dc4-41c1-4ca2-8053-bdaba43988b3',
      name: 'ADAMS Fairfax',
      url: 'https://www.adamscenter.org',
      address: '3901 Fair Ridge Dr #252, Fairfax, VA 22033, USA',
      timeZoneId: 'America/New_York',
      placeId: 'ChIJg_YTI1dPtokRzN73S9r6U2c',
      geo: {
        latitude: 38.873837,
        longitude: -77.373822
      },
      fajrIqama: s('#wp-calendar > tbody > tr:nth-child(1) > td:nth-child(3)').text(),
      zuhrIqama: s('#wp-calendar > tbody > tr:nth-child(3) > td:nth-child(3)').text(),
      asrIqama: s('#wp-calendar > tbody > tr:nth-child(4) > td:nth-child(3)').text(),
      maghribIqama: s('#wp-calendar > tbody > tr:nth-child(5) > td:nth-child(3)').text(),
      ishaIqama: s('#wp-calendar > tbody > tr:nth-child(6) > td:nth-child(3)').text(),
      juma1: j("td:contains('ADAMS Fairfax') + td > div:nth-child(1)").text(),
      juma2: j("td:contains('ADAMS Fairfax') + td > div:nth-child(2)").text()
    },
    {
      date: date,
      uuid4: '43a0962a-2729-4234-ab04-0b216c8e2ea5',
      name: 'ADAMS Ashburn Satellite Embassy Suites Heathrow Room',
      url: 'https://www.adamscenter.org',
      address: '44610 Waxpool Rd, Dulles, VA 20147, USA',
      timeZoneId: 'America/New_York',
      placeId: 'ChIJHz5FMtY4tokRi58O2xX5qxM',
      geo: {
        latitude: 39.01401,
        longitude: -77.461995
      },
      juma1: j("td:contains('ADAMS Ashburn Satellite') + td > div > div > div:nth-child(1)").text().trim(),
      juma2: j("td:contains('ADAMS Ashburn Satellite') + td > div > div > div:nth-child(2) > div > div > div:nth-child(1)").text().trim(),
      juma3: j("td:contains('ADAMS Ashburn Satellite') + td > div > div > div:nth-child(2) > div > div > div:nth-child(2)").text().trim()
    },
    {
      date: date,
      uuid4: 'f92dccc9-9582-49ce-9b38-8b4705006246',
      name: 'ADAMS Sully',
      url: 'https://www.adamscenter.org',
      address: '3900 Skyhawk Dr, Chantilly, VA 20151, USA',
      timeZoneId: 'America/New_York',
      placeId: 'ChIJz_6S94hGtokRnthH9kHTYOM',
      geo: {
        latitude: 38.900174,
        longitude: -77.427457
      },
      fajrIqama: s('#wp-calendar > tbody > tr:nth-child(1) > td:nth-child(3)').text(),
      zuhrIqama: s('#wp-calendar > tbody > tr:nth-child(3) > td:nth-child(3)').text(),
      asrIqama: s('#wp-calendar > tbody > tr:nth-child(4) > td:nth-child(3)').text(),
      maghribIqama: s('#wp-calendar > tbody > tr:nth-child(5) > td:nth-child(3)').text(),
      ishaIqama: s('#wp-calendar > tbody > tr:nth-child(6) > td:nth-child(3)').text(),
      juma1: j("td:contains('ADAMS Sully') + td > div > div:nth-child(1)").text().trim(),
      juma2: j("td:contains('ADAMS Sully') + td > div > div:nth-child(2) > div:nth-child(1)").text().trim(),
      juma3: j("td:contains('ADAMS Sully') + td > div > div:nth-child(2) > div:nth-child(2)").text().trim()
    }
  ]
}
