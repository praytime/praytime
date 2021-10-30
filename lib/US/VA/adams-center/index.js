const puppeteer = require('puppeteer')
const util = require('../../../util')

const ids = [
  {
    uuid4: '4b293ef0-14a0-41b7-9801-e7c6e6ff7e09',
    name: 'ADAMS Ashburn',
    url: 'https://www.adamscenter.org',
    address: '21740 Beaumeade Cir STE 100, Ashburn, VA 20147, USA',
    timeZoneId: 'America/New_York',
    placeId: 'ChIJK8JfXCY5tokRFka3F-HAnFU',
    geo: {
      latitude: 39.018021,
      longitude: -77.456387
    }
  },
  { // not on juma page, but still in google maps
    uuid4: '81698dc4-41c1-4ca2-8053-bdaba43988b3',
    name: 'ADAMS Fairfax',
    url: 'https://www.adamscenter.org',
    timeZoneId: 'America/New_York',
    address: '10359 B Democracy Ln, Fairfax, VA 22030, USA',
    geo: {
      latitude: 38.849321,
      longitude: -77.302137
    },
    placeId: 'ChIJL47195BPtokR6E7PbaT8Fgg'
  },
  {
    uuid4: '31651405-d226-4c53-a0f3-d81d0efc7371',
    name: 'Gainesville Juma - Wyndham Garden Manassas',
    url: 'https://www.adamscenter.org/jumah-registration',
    address: '10800 Vandor Ln, Manassas, VA 20109, USA',
    timeZoneId: 'America/New_York',
    placeId: 'ChIJz4XyACddtokRbyIZi_PWDzs',
    geo: {
      latitude: 38.8027792,
      longitude: -77.5177811
    }
  },
  {
    uuid4: '1f858dc7-182a-48e7-b9f3-b0849703f22a',
    name: 'ADAMS Sterling',
    url: 'https://www.adamscenter.org',
    address: '46903 Sugarland Rd, Sterling, VA 20164, USA',
    timeZoneId: 'America/New_York',
    placeId: 'ChIJc6S_TtU5tokRgk_TpO3j3Kw',
    geo: {
      latitude: 39.006404,
      longitude: -77.379375
    }
  },
  {
    uuid4: 'f92dccc9-9582-49ce-9b38-8b4705006246',
    name: 'ADAMS Sully',
    url: 'https://www.adamscenter.org',
    address: '4431 Brookfield Corporate Dr building f, Chantilly, VA 20151, USA',
    timeZoneId: 'America/New_York',
    placeId: 'ChIJaVreXCZEtokR5wAA42IgIpM',
    geo: {
      latitude: 38.8853645,
      longitude: -77.4376983
    }
  },
  // { // hilton, no longer on website
  //   uuid4: '05ed8229-4a57-43b0-974b-7c71860400f1',
  //   name: 'ADAMS Fairfax Juma',
  //   url: 'https://www.adamscenter.org/prayer-services',
  //   timeZoneId: 'America/New_York',
  //   address: '3950 Fair Ridge Dr, Fairfax, VA 22033, USA',
  //   geo: {
  //     latitude: 38.872725,
  //     longitude: -77.371139
  //   },
  //   placeId: 'ChIJw5yL7VBPtokRz6gzPH5FiYQ'
  // },
  // { // no longer on website
  //   uuid4: '43a0962a-2729-4234-ab04-0b216c8e2ea5',
  //   name: 'ADAMS Ashburn Satellite Juma - Embassy Suites - Heathrow Room',
  //   url: 'https://www.adamscenter.org/prayer-services',
  //   address: '44610 Waxpool Rd, Dulles, VA 20147, USA',
  //   timeZoneId: 'America/New_York',
  //   placeId: 'ChIJHz5FMtY4tokRi58O2xX5qxM',
  //   geo: {
  //     latitude: 39.01401,
  //     longitude: -77.461995
  //   }
  // },
  {
    uuid4: 'cfd101b2-913f-4ace-9a74-244b2c7767b7',
    name: 'ADAMS Tysons Juma - Marriot',
    url: 'https://www.adamscenter.org/jumah-registration',
    address: '8028 Leesburg Pike, Tysons, VA 22182, USA',
    timeZoneId: 'America/New_York',
    placeId: 'ChIJJ7WUjeZKtokRwadFeHcDM40',
    geo: {
      latitude: 38.913846,
      longitude: -77.221193
    }
  },
  {
    uuid4: '1f9de882-0c5c-4de2-a1aa-904119aa752b',
    name: 'ADAMS Reston Juma - NVHC',
    url: 'https://www.adamscenter.org/jumah-registration',
    address: '1441 Wiehle Ave, Reston, VA 20190, USA',
    timeZoneId: 'America/New_York',
    placeId: 'ChIJZcMNtTI2tokR-D3IxC5NQic',
    geo: {
      latitude: 38.971421,
      longitude: -77.332341
    }
  },
  // { // no longer on website
  //   uuid4: '6763721a-01a9-4c79-9e15-e3482fc4d87e',
  //   name: 'ADAMS Crystal City Juma - Marriott',
  //   url: 'https://www.adamscenter.org/prayer-services',
  //   address: '1999 Jefferson Davis Hwy, Arlington, VA 22202, USA',
  //   timeZoneId: 'America/New_York',
  //   placeId: 'ChIJ6U5doCi3t4kRzcsHFmtZ4Z4',
  //   geo: {
  //     latitude: 38.856419,
  //     longitude: -77.051421
  //   }
  // },
  // { // no longer on website
  //   uuid4: '04348fb3-a402-4b0c-b117-520359718639',
  //   name: 'ADAMS DC Juma - Church of Epiphany',
  //   url: 'https://www.adamscenter.org/prayer-services',
  //   address: '1317 G St NW, Washington, DC 20005, USA', // TODO move to own state dir
  //   timeZoneId: 'America/New_York',
  //   placeId: 'ChIJ9XzH-Ja3t4kRfeWp9fECHM8',
  //   geo: {
  //     latitude: 38.898723,
  //     longitude: -77.03042
  //   }
  // },
  {
    uuid4: 'c3e8e5a4-794d-4179-b8d6-dbf5eaf47cd1',
    name: 'Muslim Community Center of Leesburg',
    url: 'http://www.mccleesburg.org/',
    timeZoneId: 'America/New_York',
    address: '19838 Sycolin Rd, Leesburg, VA 20175, USA',
    placeId: 'ChIJ4fbayPw9tokRHhRI1hD5uBk',
    geo: {
      latitude: 39.0692386,
      longitude: -77.55177189999999
    }
  },
  {
    uuid4: '5f90da3a-133e-467f-88d0-8b503cb0c77e',
    name: 'Muslim Community Center of Leesburg Juma - Clarion Hotel & Conference Center Leesburg',
    url: 'https://www.adamscenter.org/jumah-registration',
    timeZoneId: 'America/New_York',
    address: '1500 E Market St, Leesburg, VA 20176, USA',
    placeId: 'ChIJbTLDLLA9tokRVRlngeslQ7E',
    geo: {
      latitude: 39.0931682,
      longitude: -77.52393649999999
    }
  }
]

exports.run = async () => {
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()

    // ignore return from page.goto
    const [frame] = await Promise.all([
      util.waitForFrame(page, 'masjidbox.com'),
      // networkidle0: all tcp connections idle for at least 500 ms
      page.goto('https://www-adamscenter-org.filesusr.com/html/a49bbb_018741b5b83d5042e9cf79cb18576f7b.html', { waitUntil: 'networkidle0' })
    ])

    const t = await frame.$$eval('div.iqamah div.time', (divs) => divs.map((div) => {
      const p = div.textContent.trim().match(/(\d{1,2})(\d{2}\w+)/)
      // convert 630AM => 6:30AM
      return `${p[1]}:${p[2]}`
    }))
    ids.forEach((r) => {
      if (!/Juma/.test(r.name)) {
        util.setIqamaTimes(r, t)
      }
      r.juma1 = 'check website'
    })
  } finally {
    await browser.close()
  }

  return ids
}
exports.ids = ids
