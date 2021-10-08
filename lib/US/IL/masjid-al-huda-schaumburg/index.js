const axios = require('axios')

const ids = [
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
//{
// "prayerTimes": [
//   {
//     "fajarTime": "5:16  AM",
//     "fajarIqamaTime": "6:15  AM",
//     "fajarBufferTime": "30",
//     "sunriseTime": "6:49  AM",
//     "dhuhrTime": "12:11  PM",
//     "dhuhrIqamaTime": "1:15  PM",
//     "dhuhrBufferTime": "120",
//     "asrTime": "3:39  PM",
//     "asrIqamaTime": "4:00  PM",
//     "asrBufferTime": "45",
//     "maghribTime": "5:26  PM",
//     "maghribIqamaTime": "5:26  PM",
//     "maghribBufferTime": "30",
//     "ishaTime": "6:39  PM",
//     "ishaIqamaTime": "7:15  PM",
//     "ishaBufferTime": "60",
//     "date": "2/14/2020",
//     "jumah1Time": "12:00 PM",
//     "jumah1IqamaTime": "12:30 PM",
//     "jumah1BufferTime": "20",
//     "jumah2Time": "1:00 PM",
//     "jumah2IqamaTime": "1:30 PM",
//     "jumah2BufferTime": "60",
//     "dateAsLocalDate": {
//       "year": 2020,
//       "month": "FEBRUARY",
//       "leapYear": true,
//       "dayOfMonth": 14,
//       "dayOfWeek": "FRIDAY",
//       "dayOfYear": 45,
//       "era": "CE",
//       "monthValue": 2,
//       "chronology": {
//         "calendarType": "iso8601",
//         "id": "ISO"
//       }
//     }
//   }
// ],
// "timeZoneOffset": -6,
// "scheduleDate": "2/14/2020"
// }
exports.run = async () => {
  let response = await axios.get('https://yahibaba.herokuapp.com/api/prayertimes/v2/daily')
  const prayerTimes = response.data.prayerTimes[0]
  ids[0].fajrIqama = prayerTimes.fajarIqamaTime
  ids[0].zuhrIqama = prayerTimes.dhuhrIqamaTime
  ids[0].asrIqama = prayerTimes.asrIqamaTime
  ids[0].maghribIqama = prayerTimes.maghribIqamaTime
  ids[0].ishaIqama = prayerTimes.ishaIqamaTime
  ids[0].juma1 = prayerTimes.jumah1Time
  ids[0].juma2 = prayerTimes.jumah2Time

  return ids
}
