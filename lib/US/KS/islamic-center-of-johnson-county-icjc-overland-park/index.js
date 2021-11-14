const axios = require('axios').default
const cheerio = require('cheerio')
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
  const response = await axios.get('https://icjc.org/aj-getHomePageData.php')

  // Sample response:
  // {
  //   "status": "success",
  //   "code": 1,
  //   "khateebSchedule": "<tr><td>Nov 26</td><td>Imam Dahee</td><td>Imam Dr Algizawi</td></tr><tr><td>Dec 10</td><td>Imam Dahee</td><td>Imam Dr Algizawi</td></tr><tr><td>Dec 24</td><td>Imam Dahee</td><td>Imam Dr Algizawi</td></tr><tr><td>Jan 07</td><td>Imam Dahee</td><td>Imam Dr Algizawi</td></tr><tr><td>Nov 19</td><td>Imam Dr Algizawi</td><td>Imam Dahee</td></tr><tr><td>Dec 03</td><td>Imam Dr Algizawi</td><td>Imam Dahee</td></tr><tr><td>Dec 17</td><td>Imam Dr Algizawi</td><td>Imam Dahee</td></tr><tr><td>Dec 31</td><td>Imam Dr Algizawi</td><td>Imam Dahee</td></tr>",
  //   "sdateTime": "2 hrs  10 mins  left",
  //   "salah": "<tr><th>Time</th><td>Adhan</td> <td>Iqama</td> </tr><tr><th>Fajr</th><td>5:46 AM</td> <td>6:25 AM</td> </tr><tr><th>Sunrise</th><td colspan=\"2\" class =\"text-center\">7:00 AM</td> </tr><tr><th>Dhuhr</th><td>12:04 PM</td> <td>1:30 PM</td> </tr><tr><th>Asr</th><td>3:25 PM</td> <td>3:40 PM</td> </tr><tr><th>Maghrib</th><td>5:06 PM</td> <td>5:20 PM</td> </tr><tr><th>Isha</th><td>6:22 PM</td> <td>7:30 PM</td> </tr>",
  //   "ksdate": "1:00 PM",
  //   "kedate": "2:00 PM",
  //   "salah_title": "Salah time for Nov 14, 2021",
  //   "hijri_date": "Ṣafar 30, 1443 | Sunday"
  // }

  const $ = cheerio.load(`<table><tbody>${response.data.salah}</tbody></table>`)

  const a = util.mapToText($, 'td:last-child')
  a.shift() // remove header
  a.splice(1, 1) // remove sunrise
  const j = [response.data.ksdate, response.data.kedate]

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
