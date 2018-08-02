const axios = require('axios')

const results = [
  {
    uuid4: '2b591b0a-6808-459b-8998-7e74f0251898',
    name: 'Masjid Al Huda',
    url: 'http://masjidalhuda.org/',
    address: '1081 Irving Park Rd, Schaumburg, IL 60193, USA',
    placeId: 'ChIJfXzPEG6pD4gRv_p7cMLrda8',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 41.997743,
      longitude: -88.118683
    }
  }
]

// example response
// {
//     "prayerTimes": [
//       {
//               "fajarTime": "3:52  AM",
//               "fajarIqamaTime": "5:00  AM",
//               "fajarBufferTime": "30",
//               "sunriseTime": "5:47  AM",
//               "dhuhrTime": "1:03  PM",
//               "dhuhrIqamaTime": "1:30  PM",
//               "dhuhrBufferTime": "120",
//               "asrTime": "6:01  PM",
//               "asrIqamaTime": "6:30  PM",
//               "asrBufferTime": "45",
//               "maghribTime": "8:12  PM",
//               "maghribIqamaTime": "8:12  PM",
//               "maghribBufferTime": "30",
//               "ishaTime": "9:41  PM",
//               "ishaIqamaTime": "10:00  PM",
//               "ishaBufferTime": "60",
//               "date": "8/2/2018",
//               "jumah1Time": "1:00 PM",
//               "jumah1IqamaTime": "1:30 PM",
//               "jumah1BufferTime": "20",
//               "jumah2Time": "2:00 PM",
//               "jumah2IqamaTime": "2:30 PM",
//               "jumah2BufferTime": "60"
//             }
//     ],
//       "timeZoneOffset": -5,
//       "scheduleDate": "8/2/2018"
// }
exports.run = async () => {
  const date = new Date()
  let response = await axios.get('https://yahibaba.herokuapp.com/api/prayertimes/daily')
  const prayerTimes = response.data.prayerTimes[0]
  results[0].crawlTime = date
  results[0].fajrIqama = prayerTimes.fajarIqamaTime
  results[0].zuhrIqama = prayerTimes.dhuhrIqamaTime
  results[0].asrIqama = prayerTimes.asrIqamaTime
  results[0].maghribIqama = prayerTimes.maghribIqamaTime
  results[0].ishaIqama = prayerTimes.ishaIqamaTime
  results[0].juma1 = prayerTimes.jumah1Time
  results[0].juma2 = prayerTimes.jumah2Time

  return results
}

// exports.apifySettings = {
//   startUrls: [ { 'value': 'http://masjidalhuda.org/' } ],
//   pageFunction: function pageFunction (context) {
//     const date = new Date()
//     const $ = context.jQuery
//     const startedAt = Date.now()
//     const element = '#prayertimegrid1'
//
//     const extractData = function () {
//       // timeout after 10 seconds
//       if ((Date.now() - startedAt) > 10000) {
//         context.finish('Timed out')
//         return
//       }
//
//       // if my element still hasn't been loaded, wait a little more
//       if ($(element).length === 0) {
//         setTimeout(extractData, 500)
//         return
//       }
//
//       // refresh page screenshot and HTML for debugging
//       // context.saveSnapshot()
//
//       // save a result
//       context.finish({
//         results: [
//           {
//             uuid4: '2b591b0a-6808-459b-8998-7e74f0251898',
//             crawlTime: date,
//             name: 'Masjid Al Huda',
//             url: 'http://masjidalhuda.org/',
//             address: '1081 Irving Park Rd, Schaumburg, IL 60193, USA',
//             placeId: 'ChIJfXzPEG6pD4gRv_p7cMLrda8',
//             timeZoneId: 'America/Chicago',
//             geo: {
//               latitude: 41.997743,
//               longitude: -88.118683
//             },
//             fajrIqama: $('#prayertimegrid1 > tbody > tr.active > td:nth-child(2) > h4 > span').text().trim(),
//             zuhrIqama: $('#prayertimegrid1 > tbody > tr.active > td:nth-child(4) > h4 > span').text().trim(),
//             asrIqama: $('#prayertimegrid1 > tbody > tr.active > td:nth-child(5) > h4 > span').text().trim(),
//             maghribIqama: $('#prayertimegrid1 > tbody > tr.active > td:nth-child(6) > h4 > span').text().trim(),
//             ishaIqama: $('#prayertimegrid1 > tbody > tr.active > td:nth-child(7) > h4 > span').text().trim(),
//             juma1: $('#prayertimegrid1 > tbody > tr:nth-child(1) > td:nth-child(8) > h4 > span').text().trim(),
//             juma2: $('#prayertimegrid1 > tbody > tr:nth-child(1) > td:nth-child(9) > h4 > span').text().trim()
//           }
//         ]
//       })
//     }
//
//     // tell the crawler that pageFunction will finish asynchronously
//     context.willFinishLater()
//     extractData()
//   }.toString()
// }
