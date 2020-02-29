const axios = require('axios')

const tz = require('timezone')
const us = tz(require('timezone/America'))
const today = us(Date.now(), 'America/Chicago', '%B%d')

const results = [
  {
    uuid4: 'b2bb6aa2-dc2b-433c-a490-6c444a2dc36b',
    name: 'Makki Masjid',
    url: 'https://makkimasjid.com',
    address: '3418 W Ainslie St, Chicago, IL 60625, USA',
    placeId: 'ChIJf2or3ebND4gR6xnJDpsS1QU',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 41.970328,
      longitude: -87.714355
    }
  },
  {
    uuid4: 'b03ba861-7727-4099-b078-a4e9a089fce5',
    name: 'Makki Education Academy',
    url: 'https://makkimasjid.com/mea/',
    address: '4926 N Kimball Ave, Chicago, IL 60625, USA',
    placeId: 'ChIJKd69y-bND4gRhnBRKC-_1Gw',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 41.97112,
      longitude: -87.713793
    }
  }
]

// Sample output:
// curl -fsSL 'https://script.googleusercontent.com/macros/echo?user_content_key=KSk9ZhDp9hLRqA5opjQvdhM6X7EMmoPlA0M-FWHhYAi-z3jG1oq_q0rG2Xy1U5dFyWD8yREFBPTkmPaPYYUy6ecaKi0a_Wwxm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGktHVXuA-iL5UIitRyLqR2ATYPkodvISZPjLO5148TxIPa4ASuRHszTrYLgAtrb9VnVCMzgzCmP&lib=MAZ0i1i3HNPmaQNbU5js4zf9jz5b0QBE4'
// {
//   "February26": {
//     "Feb": "26",
//     "Islamic Date": "21-Jum-II",
//     "Day": "Tue",
//     "Fajr": "4:58",
//     "Fajr Iqamah": "6:00",
//     "Sunrise": "6:31",
//     "Zuhr": "12:08",
//     "Zuhr Iqamah": "1:00",
//     "Asr": "3:51",
//     "Asr Iqamah": "4:30",
//     "Maghrib": "5:37",
//     "Ishaa": "7:08",
//     "Ishaa Iqamah": "7:30"
//   },
//   "February27": {
//     "Feb": "27",
//     "Islamic Date": "22-Jum-II",
//     "Day": "Wed",
//     "Fajr": "4:57",
//     "Fajr Iqamah": "6:00",
//     "Sunrise": "6:30",
//     "Zuhr": "12:08",
//     "Zuhr Iqamah": "1:00",
//     "Asr": "3:52",
//     "Asr Iqamah": "4:30",
//     "Maghrib": "5:38",
//     "Ishaa": "7:09",
//     "Ishaa Iqamah": "7:30"
//   },
//   "year_juma_news": {
//     "Islamicyear": "1440",
//     "Juma-1": "1:00",
//     "Juma-2": "2:00",
//     "Update": "News",
//     "NEWS-1": "{title1:'Juma at MEA',content1:'Juma time at MEA is 2:00 PM. MEA Address - 4926 N. Kimball Ave.'}",
//     "NEWS-2": "{title2:'',content2:''}",
//     "NEWS-3": "{title3:'',content3:''}"
//   }
// }

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=_P4mc7bZcAtdUmXh6ji4VsoPmVUHPuO45WZCnyh6ekVd5R-zyct46V0o1XMXdxJLqOcVQzt2fIFrqegkJsQPH3QRT27IW6rIm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGktHVXuA-iL5UIitRyLqR2ATYPkodvISZPjLO5148TxIPa4ASuRHszTrYLgAtrb9VnVCMzgzCmP&lib=MAZ0i1i3HNPmaQNbU5js4zf9jz5b0QBE4')

  const timings = response.data[today]
  // const jumaTimings = response.data['year_juma_news']
  // console.log(response.data[today])
  //
  results[0].crawlTime = date
  results[0].fajrIqama = timings['Fajr Iqamah']
  results[0].zuhrIqama = timings['Zuhr Iqamah']
  results[0].asrIqama = timings['Asr Iqamah']
  results[0].maghribIqama = timings['Maghrib']
  results[0].ishaIqama = timings['Ishaa Iqamah']
  results[0].juma1 = 'check website'
  results[1].crawlTime = date
  results[1].juma1 = 'check website'

  return results
}
