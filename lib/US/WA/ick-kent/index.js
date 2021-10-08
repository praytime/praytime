const axios = require('axios').default
const util = require('../../../util')
const tz = require('timezone')
const us = tz(require('timezone/America'))

const ids = [
  {
    uuid4: '3c9ad4a0-1eec-43ec-ad55-c92531c5acf5',
    name: 'Islamic Center of Kent',
    url: 'http://islamiccenterofkent.org',
    timeZoneId: 'America/Los_Angeles',
    address: '20857 108th Ave SE, Kent, WA 98031, USA',
    geo: {
      latitude: 47.414238,
      longitude: -122.198083
    },
    placeId: 'ChIJa9oRvTVckFQRXhoz138Dq08'
  }
]

// {
//   "id": 2402,
//   "month": "Oct",
//   "day": 8,
//   "fajrBegin": "5:54",
//   "fajr": "6:30",
//   "shuruq": "7:18",
//   "dhuhrBegin": "1:00",
//   "dhuhr": "1:30",
//   "asrBegin": "4:00",
//   "asrBeginHanafi": "4:44",
//   "asr": "5:00",
//   "maghribBegin": "6:37",
//   "maghrib": "6:45",
//   "ishaBegin": "8:02",
//   "isha": "8:15",
//   "appUserId": "6d8abd0d-48df-484e-a2b4-ff545e1f59c0",
//   "appUser": {
//     "displayName": "Islamic Center of Kent",
//     "city": "Kent",
//     "state": "WA",
//     "zipCode": null,
//     "id": "6d8abd0d-48df-484e-a2b4-ff545e1f59c0",
//     "userName": "ick",
//     "normalizedUserName": "ICK",
//     "email": "ick@test.com",
//     "normalizedEmail": "ICK@TEST.COM",
//     "emailConfirmed": false,
//     "passwordHash": "AQAAAAEAACcQAAAAEKXv5nsHnK8l1diBGC9Asp/YUBHguAwRvoDTbqHPzQHlGNfMZzXBx95kh9H5UtTSzw==",
//     "securityStamp": "IG7LYJPFM4IA5ZOSB7BRPT3ZN33KBOJB",
//     "concurrencyStamp": "07bc9b83-2b09-45ea-9ded-8d35a5940d99",
//     "phoneNumber": null,
//     "phoneNumberConfirmed": false,
//     "twoFactorEnabled": false,
//     "lockoutEnd": null,
//     "lockoutEnabled": true,
//     "accessFailedCount": 0
//   }
// }

// TODO: use puppeteer, scrape iframe for juma times
exports.run = async () => {
  // %B: full month name
  const month = us(Date.now(), ids[0].timeZoneId, '%B')
  // %e: day of the month, padded with a leading space for single digit values (1-31)
  const day = us(Date.now(), ids[0].timeZoneId, '%d').trim()

  const response = await axios.get(`https://mysalah.herokuapp.com/api/salah/${month}/${day}?userName=ick`)

  const d = response.data

  util.setTimes(ids[0], [
    d.fajr,
    d.dhuhr,
    d.asr,
    d.maghrib,
    d.isha,
    'check website',
    'check website'
  ])

  return ids
}
exports.ids = ids
