const axios = require('axios')
const cheerio = require('cheerio')

const results = [
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
  {
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
    name: 'ADAMS Gainesville',
    url: 'https://www.adamscenter.org',
    address: '10800 Vandor Ln, Manassas, VA 20109, USA',
    timeZoneId: 'America/New_York',
    placeId: 'ChIJz4XyACddtokRbyIZi_PWDzs',
    geo: {
      latitude: 38.802879,
      longitude: -77.517521
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
    address: '3900 Skyhawk Dr, Chantilly, VA 20151, USA',
    timeZoneId: 'America/New_York',
    placeId: 'ChIJz_6S94hGtokRnthH9kHTYOM',
    geo: {
      latitude: 38.900174,
      longitude: -77.427457
    }
  },
  {
    uuid4: '05ed8229-4a57-43b0-974b-7c71860400f1',
    name: 'ADAMS Fairfax Juma',
    url: 'https://www.adamscenter.org/prayer-services',
    timeZoneId: 'America/New_York',
    address: '3950 Fair Ridge Dr, Fairfax, VA 22033, USA',
    geo: {
      latitude: 38.872725,
      longitude: -77.371139
    },
    placeId: 'ChIJw5yL7VBPtokRz6gzPH5FiYQ'
  },
  {
    uuid4: '43a0962a-2729-4234-ab04-0b216c8e2ea5',
    name: 'ADAMS Ashburn Satellite Juma - Embassy Suites - Heathrow Room',
    url: 'https://www.adamscenter.org/prayer-services',
    address: '44610 Waxpool Rd, Dulles, VA 20147, USA',
    timeZoneId: 'America/New_York',
    placeId: 'ChIJHz5FMtY4tokRi58O2xX5qxM',
    geo: {
      latitude: 39.01401,
      longitude: -77.461995
    }
  },
  {
    uuid4: 'cfd101b2-913f-4ace-9a74-244b2c7767b7',
    name: 'ADAMS Tysons Juma - Sheraton Premier',
    url: 'https://www.adamscenter.org/prayer-services',
    address: '8661 Leesburg Pike, Tysons, VA 22182, USA',
    timeZoneId: 'America/New_York',
    placeId: 'ChIJz7Ds62BKtokR-EzQ6x81DNs',
    geo: {
      latitude: 38.931,
      longitude: -77.24606
    }
  },
  {
    uuid4: '1f9de882-0c5c-4de2-a1aa-904119aa752b',
    name: 'ADAMS Reston Juma - NVHC',
    url: 'https://www.adamscenter.org/prayer-services',
    address: '1441 Wiehle Ave, Reston, VA 20190, USA',
    timeZoneId: 'America/New_York',
    placeId: 'ChIJZcMNtTI2tokR-D3IxC5NQic',
    geo: {
      latitude: 38.971421,
      longitude: -77.332341
    }
  },
  {
    uuid4: '6763721a-01a9-4c79-9e15-e3482fc4d87e',
    name: 'ADAMS Crystal City Juma - Marriott',
    url: 'https://www.adamscenter.org/prayer-services',
    address: '1999 Jefferson Davis Hwy, Arlington, VA 22202, USA',
    timeZoneId: 'America/New_York',
    placeId: 'ChIJ6U5doCi3t4kRzcsHFmtZ4Z4',
    geo: {
      latitude: 38.856419,
      longitude: -77.051421
    }
  },
  {
    uuid4: '04348fb3-a402-4b0c-b117-520359718639',
    name: 'ADAMS DC Juma - Church of Epiphany',
    url: 'https://www.adamscenter.org/prayer-services',
    address: '1317 G St NW, Washington, DC 20005, USA', // TODO move to own state dir
    timeZoneId: 'America/New_York',
    placeId: 'ChIJ9XzH-Ja3t4kRfeWp9fECHM8',
    geo: {
      latitude: 38.898723,
      longitude: -77.03042
    }
  }
]

// TODO
// Request:
// curl     'https://www.adamscenter.org//_api/wix-code-public-dispatcher/siteview/wix/data-web.jsw/find.ajax?gridAppId=05d4bac5-c9c8-42ae-a58f-87e54e43ecf1&instance=wixcode-pub.f57452ff62fc0e9f844b3f51c18ee9dc880f4f00.eyJpbnN0YW5jZUlkIjoiZTg3NTJjYzktYzQ5MS00YWI4LWFjZTMtYTM5NWU5NTRmNTEzIiwiaHRtbFNpdGVJZCI6IjRjNDJmYzg1LWM1NTYtNDc4Yy1hM2MxLTllMmM4MzM4NmFjNyIsInVpZCI6bnVsbCwicGVybWlzc2lvbnMiOm51bGwsImlzVGVtcGxhdGUiOmZhbHNlLCJzaWduRGF0ZSI6MTU4MTgyMzA0NzIxOCwiYWlkIjoiZTE2M2QwMWMtNDk5OS00ZTIwLWFkYWEtMDYxNTJkZDdmMzk1IiwiYXBwRGVmSWQiOiJDbG91ZFNpdGVFeHRlbnNpb24iLCJpc0FkbWluIjpmYWxzZSwibWV0YVNpdGVJZCI6IjdkOTJmZWE2LWNhNDMtNGIyZC05OWJjLTZmYWRkNjgwMWYxYiIsImNhY2hlIjpudWxsLCJleHBpcmF0aW9uRGF0ZSI6bnVsbCwicHJlbWl1bUFzc2V0cyI6Ikhhc0RvbWFpbixTaG93V2l4V2hpbGVMb2FkaW5nLEFkc0ZyZWUiLCJ0ZW5hbnQiOm51bGwsInNpdGVPd25lcklkIjoiNmI3NWRmMDMtZGNmNS00OTA1LWExMjEtZmRiYjk1NjkyYTA2IiwiaW5zdGFuY2VUeXBlIjoicHViIiwic2l0ZU1lbWJlcklkIjpudWxsfQ==&viewMode=site'     -H 'Content-Type: application/json'     --data-binary '["PrayerTimes",{"$and":[{"month":2},{"day":15}]},null,0,50,null,[]]'
//
// Response:
// {
//   "result": {
//     "totalCount": 1,
//     "items": [
//       {
//         "_id": "d53bb145-249a-4354-9d4d-8a4708893fc9",
//         "_owner": "66ca3ca4-d454-454c-852c-33e9c4157905",
//         "_createdDate": {
//           "$date": "2019-05-06T03:51:20.880Z"
//         },
//         "dhuhur": "12:24 PM",
//         "fajrIqama": "6:15 AM",
//         "isha": "7:03 PM",
//         "_updatedDate": {
//           "$date": "2020-03-04T03:35:21.042Z"
//         },
//         "ishaIqama": "8:00 PM",
//         "maghribIqama": "5:55 PM",
//         "asr": "3:24 PM",
//         "maghrib": "5:48 PM",
//         "sunrise": "7:00 AM",
//         "fajr": "5:45 AM",
//         "title": "Saturday, February 15, 2020",
//         "asrIqama": "3:45",
//         "dhuhurIqama": "1:30 PM",
//         "day": 15,
//         "month": 2
//       }
//     ],
//     "schema": { ...}
//   }
// }

exports.run = async () => {
  const date = new Date()

  results.forEach((r) => {
    r.crawlTime = date
  })

  return results
}
