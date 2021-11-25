const util = require('../../../util')

const ids = [
  {
    uuid4: 'f3dcfd95-9670-44a8-bc9b-7cb763e2994c',
    name: 'Islamic Society of Greater Valley Forge',
    url: 'http://www.isgvf.com/',
    timeZoneId: 'America/New_York',
    address: '958 N Valley Forge Rd, Devon, PA 19333, USA',
    placeId: 'ChIJm91vh4KUxokRBbPywjhcF-k',
    geo: {
      latitude: 40.066958,
      longitude: -75.433962
    }
  }
]

exports.run = async () => {
  const dateStr = util.strftime('%d%b%Y', ids[0].timeZoneId).toUpperCase()
  const [d] = await util.loadJson('https://app.flashgood.org/api/v1/prayertime.php?id=27')
  // d.prayer_time.prayer_time = [
  // ...
  //   {
  //     "date": "01DEC2021",
  //     "sunrise": "7:05 AM",
  //     "sunset": "4:37 PM",
  //     "prayerTime": {
  //       "fajr": "6:15 AM",
  //       "dhuhr": "12:30 PM",
  //       "asr": "2:30 PM",
  //       "maghrib": "4:42 PM",
  //       "isha": "7:30 PM"
  //     }
  //   },
  //   ...
  // ]
  const p = JSON.parse(d.prayer_time).prayerTimes
    .find(({ date }) => date === dateStr)
    .prayerTime
  util.setIqamaTimes(ids[0], [p.fajr, p.dhuhr, p.asr, p.maghrib, p.isha])

  // d.friday_time =
  // [
  //   {
  //     "name": "JUMA 1",
  //     "time": {
  //       "hour": 12,
  //       "minute": 15,
  //       "second": 0
  //     },
  //     "dst": true
  //   },
  //   {
  //     "name": "JUMA 2",
  //     "time": {
  //       "hour": 13,
  //       "minute": 0,
  //       "second": 0
  //     },
  //     "dst": true
  //   },
  //   {
  //     "name": "JUMA 3",
  //     "time": {
  //       "hour": 13,
  //       "minute": 45,
  //       "second": 0
  //     },
  //     "dst": true
  //   }
  // ]
  util.setJumaTimes(ids[0], JSON.parse(d.friday_time)
    .map(({ time }) => `${time.hour}:${time.minute}`))

  return ids
}

exports.ids = ids
