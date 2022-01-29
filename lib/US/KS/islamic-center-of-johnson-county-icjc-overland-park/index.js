const util = require('../../../util')

const ids = [
  {
    uuid4: 'af9fbb37-2ba5-4331-b5ca-e3f19c78fe59',
    name: 'Islamic Center of Johnson County (ICJC)',
    url: 'http://icjc.org/',
    timeZoneId: 'America/Chicago',
    address: '9005 W 151st St, Overland Park, KS 66221, USA',
    placeId: 'ChIJuwdOwlXAwIcRub7ab9pFeGo',
    geo: {
      latitude: 38.8538252,
      longitude: -94.690525
    }
  }
]

exports.run = async () => {
  const [p, j] = await Promise.all([
    util.loadJson('https://icjc.org/aj-getTodaySalahTime_MasjBrd_db.php'),
    util.loadJson('https://icjc.org/aj-getComingKhateebSch.php')
  ])

  // Sample response:
  // {
  //   "nextday": "2022-01-30",
  //   "fajr_iqama": "6:35 AM",
  //   "dhuhr_iqama": "1:30 PM",
  //   "asr_iqama": "4:05 PM",
  //   "maghrib_iqama": "5:40 PM",
  //   "isha_iqama": "7:30 PM",
  //   "next_salah": "DHUHR in",
  //   "fajr_iqama2": "2022-01-30 06:35:00",
  //   "fajr_iqama1": "6:35 AM",
  //   "sdateTime": "5 hr 50 mins",
  //   "code": 1,
  //   "date": "Jan 29, 2022",
  //   "date4board": "Jan 29, 2022",
  //   "day": "Saturday",
  //   "hijridate": "Jumada Al-Akhirah 26, 1443"
  // }
  util.setIqamaTimes(ids[0], [
    p.fajr_iqama,
    p.dhuhr_iqama,
    p.asr_iqama,
    p.maghrib_iqama,
    p.isha_iqama
  ])

  // {
  //   "calculatedtime": "07:45",
  //   "curr_friday1": false,
  //   "date_today1": "2022-01-28",
  //   "date": "Feb 04, 2022",
  //   "curreenttime": "7:45 AM",
  //   "day mame": "Saturday",
  //   "date1": "2022-02-04",
  //   "date2": "2022-02-04",
  //   "khateb_sch_1": "1:15 PM",
  //   "khateb_sch_2": "2:15 PM",
  //   "sch_12pm": "Imam Dahee",
  //   "sch_1pm": "Imam Dr Algizawi",
  //   "imprnt_msg": "Proper wearing of mask (covering your nose and mouth), bringing your rug and maintaining social distance is required in the mosque. May Allah keep us safe. Donate to the masjid generously."
  // }
  util.setJumaTimes(ids[0], [
    j.khateb_sch_1,
    j.khateb_sch_2
  ])

  return ids
}

exports.ids = ids
