const axios = require('axios')
const tz = require('timezone')
const us = tz(require('timezone/America'))

const results = [
  {
    uuid4: 'a5d9ddbe-664f-4064-80c3-3cb07f7335b7',
    name: 'Islamic Society of Delaware',
    url: 'http://www.isdonline.org/',
    address: '2934, 28 Salem Church Rd, Newark, DE 19713, United States',
    timeZoneId: 'America/New_York',
    placeId: 'ChIJ_T8wFroAx4kRrT4wHeUO1rk',
    geo: {
      latitude: 39.675908,
      longitude: -75.696218
    }
  }
]

// sample output
// https://isdonline.org/home/get_Payer_Time?month=2&date=24
// [
//   {
//     "FajarBegin": "5:28 AM",
//     "FajarAdhan": "05:30 AM",
//     "Fajar": "5:45 AM",
//     "ZuharBegin": "12:16 PM",
//     "ZuharAdhan": "12:20 PM",
//     "Zuhar": "12:35 PM",
//     "AsrBegin": "3:22 PM",
//     "AsrAdhan": "03:30 PM",
//     "Asr": "3:45 PM",
//     "MaghribBegin": "5:51 PM",
//     "MaghribAdhan": "05:51 PM",
//     "Maghrib": "5:51 PM",
//     "IshaBegin": "7:05 PM",
//     "IshaAdhan": "07:15 PM",
//     "Isha": "7:30 PM",
//     "Jumma1Begin": "",
//     "Jumma1Adhan": "12:00 PM",
//     "Jumma1": "12:30 PM",
//     "Jumma2Begin": "",
//     "Jumma2Adhan": "01:15 PM",
//     "Jumma2": "1:45 PM",
//     "Jumma3Begin": "",
//     "Jumma3Adhan": "12:00 AM",
//     "Jumma3": "undefined",
//     "HijriOffset": "-2"
//   }
// ]

exports.run = async () => {
  const month = us(Date.now(), results[0].timeZoneId, '%m')
  const day = us(Date.now(), results[0].timeZoneId, '%d')
  const response = await axios.get('https://isdonline.org/home/get_Payer_Time', {
    params: {
      month: month,
      date: day
    }
  })

  const timings = response.data[0]

  results[0].fajrIqama = timings.Fajar
  results[0].zuhrIqama = timings.Zuhar
  results[0].asrIqama = timings.Asr
  results[0].maghribIqama = timings.Maghrib
  results[0].ishaIqama = timings.Isha
  results[0].juma1 = timings.Jumma1Adhan
  results[0].juma2 = timings.Jumma2Adhan

  return results
}
