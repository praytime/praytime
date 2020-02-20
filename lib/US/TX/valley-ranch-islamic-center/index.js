const axios = require('axios')

const results = [
  {
    uuid4: 'deb1ec47-1b30-44c2-b528-2fd703820abc',
    name: 'Valley Ranch Islamic Center',
    url: 'http://www.valleyranchmasjid.org/',
    timeZoneId: 'America/Chicago',
    address: '351 Ranchview Dr, Irving, TX 75063',
    geo: {
      latitude: 32.939534,
      longitude: -96.953352
    },
    placeId: 'ChIJ7ffag_ooTIYRi_p4uRLcKBQ',
  }
]

// {
//   "adjustedHijriDate": null
//   "asrAdhan": "03:51 PM",
//   "asrIqamah": "04:00 PM",
//   "clientID": "1",
//   "duhrAdhan": "12:42 PM",
//   "duhrIqamah": "01:00 PM",
//   "fajrAdhan": "05:58 AM",
//   "fajrIqamah": "06:30 AM",
//   "firstJummahAdhan": "01:00 PM",
//   "firstJummahIqamah": "01:30 PM",
//   "firstJummahKhateeb": "Br. Tammam Alwan",
//   "fromDate": "2/20/2020",
//   "hijriAdjustmentValue": 0,
//   "hijriDate": null,
//   "ishaAdhan": "07:25 PM",
//   "ishaIqamah": "07:45 PM",
//   "jummahDate": "2/21/2020",
//   "maghribAdhan": "06:17 PM",
//   "maghribIqamah": "06:22 PM",
//   "nextDayFajrAdhan": "05:57 AM",
//   "nextDayFajrIqamah": "06:30 AM",
//   "prayerName": "Duhr",
//   "secondJummahAdhan": "02:15 PM",
//   "secondJummahIqamah": "02:45 PM",
//   "secondJummahKhateeb": "Br. Kashif Zia",
//   "secondsInCountDown": "11924",
//   "sunrise": "07:06 AM",
//   "taraweeh": null,
// }
//
exports.run = async () => {
  let response = await axios.get('https://api.masjidapps.com/masjid/publicPrayerTimes/MQ2/NzY1ZjcxZmQtZjE0NS00OGFjLTljYTgtMjBiYmRlYjdkZGRj0')
  const date = new Date()
  const prayerTimes = response.data
  results[0].crawlTime = date
  results[0].fajrIqama = prayerTimes.fajrIqamah
  results[0].zuhrIqama = prayerTimes.duhrIqamah
  results[0].asrIqama = prayerTimes.asrIqamah
  results[0].maghribIqama = prayerTimes.maghribIqamah
  results[0].ishaIqama = prayerTimes.ishaIqamah
  results[0].juma1 = prayerTimes.firstJummahAdhan
  results[0].juma2 = prayerTimes.secondJummahAdhan

  return results
}
