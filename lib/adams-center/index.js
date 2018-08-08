const axios = require('axios')
const cheerio = require('cheerio')

exports.run = async () => {
  const date = new Date()

  const [salahResp, jumuaResp] = await Promise.all([
    axios.get('https://www.adamscenter.org/salat_times.php'),
    axios.get('https://www.adamscenter.org/jummah-friday-prayer-satellites-info/')
  ])

  const $s = cheerio.load(salahResp.data)
  const $j = cheerio.load(jumuaResp.data)

  // salah times
  const s = [
    $s('#wp-calendar > tbody > tr:nth-child(1) > td:nth-child(3)').text(),
    $s('#wp-calendar > tbody > tr:nth-child(3) > td:nth-child(3)').text(),
    $s('#wp-calendar > tbody > tr:nth-child(4) > td:nth-child(3)').text(),
    $s('#wp-calendar > tbody > tr:nth-child(5) > td:nth-child(3)').text(),
    $s('#wp-calendar > tbody > tr:nth-child(6) > td:nth-child(3)').text()
  ]

  const j = [
    /* 0 */ $j("td:contains('ADAMS Sterling') + td").text().match(/(\d{1,2}:\d{1,2})/g),
    /* 1 */ $j("td:contains('21740 Beaumeade Circle') + td").text().match(/(\d{1,2}:\d{1,2})/g),
    /* 2 */ $j("td:contains('ADAMS Fairfax') + td").text().match(/(\d{1,2}:\d{1,2})/g),
    /* 3 */ $j("td:contains('ADAMS Ashburn Satellite') + td").text().match(/(\d{1,2}:\d{1,2})/g),
    /* 4 */ $j("td:contains('ADAMS Sully') + td").text().match(/(\d{1,2}:\d{1,2})/g),
    /* 5 */ $j("td:contains('ADAMS Tysons') + td").text().match(/(\d{1,2}:\d{1,2})/g),
    /* 6 */ $j("td:contains('NVHC') + td").text().match(/(\d{1,2}:\d{1,2})/g),
    /* 7 */ $j("td:contains('Crystal City') + td").text().match(/(\d{1,2}:\d{1,2})/g),
    /* 8 */ $j("td:contains('Church of Epiphany') + td").text().match(/(\d{1,2}:\d{1,2})/g),
    /* 9 */ $j("td:contains('ADAMS Greater Gainesville') + td").text().match(/(\d{1,2}:\d{1,2})/g)
  ]

  return [
    {
      crawlTime: date,
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
      fajrIqama: s[0],
      zuhrIqama: s[1],
      asrIqama: s[2],
      maghribIqama: s[3],
      ishaIqama: s[4],
      juma1: j[0][0],
      juma2: j[0][1],
      juma3: j[0][2]
    },
    {
      crawlTime: date,
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
      fajrIqama: s[0],
      zuhrIqama: s[1],
      asrIqama: s[2],
      maghribIqama: s[3],
      ishaIqama: s[4],
      juma1: j[1][0],
      juma2: j[1][1],
      juma3: j[1][2]
    },
    {
      crawlTime: date,
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
      fajrIqama: s[0],
      zuhrIqama: s[1],
      asrIqama: s[2],
      maghribIqama: s[3],
      ishaIqama: s[4],
      juma1: j[2][0],
      juma2: j[2][1],
      juma3: j[2][2]
    },
    {
      crawlTime: date,
      uuid4: '43a0962a-2729-4234-ab04-0b216c8e2ea5',
      name: 'ADAMS Ashburn Satellite - Embassy Suites - Heathrow Room',
      url: 'https://www.adamscenter.org/jummah-friday-prayer-satellites-info/',
      address: '44610 Waxpool Rd, Dulles, VA 20147, USA',
      timeZoneId: 'America/New_York',
      placeId: 'ChIJHz5FMtY4tokRi58O2xX5qxM',
      geo: {
        latitude: 39.01401,
        longitude: -77.461995
      },
      juma1: j[3][0],
      juma2: j[3][1],
      juma3: j[3][2]
    },
    {
      crawlTime: date,
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
      fajrIqama: s[0],
      zuhrIqama: s[1],
      asrIqama: s[2],
      maghribIqama: s[3],
      ishaIqama: s[4],
      juma1: j[4][0],
      juma2: j[4][1],
      juma3: j[4][2]
    },
    {
      crawlTime: date,
      uuid4: 'cfd101b2-913f-4ace-9a74-244b2c7767b7',
      name: 'ADAMS Tysons - Sheraton Premier',
      url: 'https://www.adamscenter.org/jummah-friday-prayer-satellites-info/',
      address: '8661 Leesburg Pike, Tysons, VA 22182, USA',
      timeZoneId: 'America/New_York',
      placeId: 'ChIJz7Ds62BKtokR-EzQ6x81DNs',
      geo: {
        latitude: 38.931,
        longitude: -77.24606
      },
      juma1: j[5][0],
      juma2: j[5][1],
      juma3: j[5][2]
    },
    {
      crawlTime: date,
      uuid4: '1f9de882-0c5c-4de2-a1aa-904119aa752b',
      name: 'ADAMS Reston - NVHC',
      url: 'https://www.adamscenter.org/jummah-friday-prayer-satellites-info/',
      address: '1441 Wiehle Ave, Reston, VA 20190, USA',
      timeZoneId: 'America/New_York',
      placeId: 'ChIJZcMNtTI2tokR-D3IxC5NQic',
      geo: {
        latitude: 38.971421,
        longitude: -77.332341
      },
      juma1: j[6][0],
      juma2: j[6][1],
      juma3: j[6][2]
    },
    {
      crawlTime: date,
      uuid4: '6763721a-01a9-4c79-9e15-e3482fc4d87e',
      name: 'ADAMS Crystal City - Marriott',
      url: 'https://www.adamscenter.org/jummah-friday-prayer-satellites-info/',
      address: '1999 Jefferson Davis Hwy, Arlington, VA 22202, USA',
      timeZoneId: 'America/New_York',
      placeId: 'ChIJ6U5doCi3t4kRzcsHFmtZ4Z4',
      geo: {
        latitude: 38.856419,
        longitude: -77.051421
      },
      juma1: j[7][0],
      juma2: j[7][1],
      juma3: j[7][2]
    },
    {
      crawlTime: date,
      uuid4: '04348fb3-a402-4b0c-b117-520359718639',
      name: 'ADAMS DC - Church of Epiphany',
      url: 'https://www.adamscenter.org/jummah-friday-prayer-satellites-info/',
      address: '1317 G St NW, Washington, DC 20005, USA',
      timeZoneId: 'America/New_York',
      placeId: 'ChIJ9XzH-Ja3t4kRfeWp9fECHM8',
      geo: {
        latitude: 38.898723,
        longitude: -77.03042
      },
      juma1: j[8][0],
      juma2: j[8][1],
      juma3: j[8][2]
    },
    {
      crawlTime: date,
      uuid4: '31651405-d226-4c53-a0f3-d81d0efc7371',
      name: 'ADAMS Greater Gainesville - Wyndham Hotel',
      url: 'https://www.adamscenter.org/jummah-friday-prayer-satellites-info/',
      address: '10800 Vandor Ln, Manassas, VA 20109, USA',
      timeZoneId: 'America/New_York',
      placeId: 'ChIJz4XyACddtokRbyIZi_PWDzs',
      geo: {
        latitude: 38.802879,
        longitude: -77.517521
      },
      juma1: j[9][0],
      juma2: j[9][1],
      juma3: j[9][2]
    }
  ]
}
