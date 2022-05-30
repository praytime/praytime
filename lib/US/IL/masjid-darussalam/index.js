const util = require('../../../util')
const axios = require('axios')
const { parse } = require('csv-parse/sync')

const ids = [
  {
    name: 'Masjid DarusSalam',
    url: 'http://masjidds.org',
    address: '21W525 North Avenue, Lombard, IL 60148, USA',
    timeZoneId: 'America/Chicago',
    uuid4: '1e948232-29be-48b2-bb74-5f645db0ae2d',
    placeId: 'ChIJiUyP7EGtD4gR1VchuGB3JXE',
    geo: {
      latitude: 41.903020,
      longitude: -88.045350
    }
  }
]

exports.run = async () => {
  const csvResponse = await axios.get('https://docs.google.com/spreadsheets/u/0/d/1bQ282enkhtsCIf_wyu_65ldtEOP-CHvhuZXIdQ5f8d0/pub?range=E10:G21&output=csv')

  const csv = parse(csvResponse.data, { columns: true })
  // sample
  // [
  //   { Salah: 'Fajr', Starts: '5:40 AM', Iqamah: '6:15 AM' },
  //   { Salah: 'Sunrise', Starts: '7:19 AM', Iqamah: '' },
  //   { Salah: 'Zuhr', Starts: '11:56 AM', Iqamah: '1:30 PM' },
  //   { Salah: 'Asr', Starts: '2:50 PM', Iqamah: '3:30 PM' },
  //   { Salah: 'Maghrib', Starts: '4:34 PM', Iqamah: '' },
  //   { Salah: 'Isha', Starts: '5:55 PM', Iqamah: '7:30 PM' },
  //   { Salah: 'Next Fajr', Starts: '5:40 AM', Iqamah: '6:15 AM' },
  //   { Salah: "Jumu'ah", Starts: 'Address', Iqamah: 'Iqamah' },
  //   {
  //     Salah: '1st\n2nd',
  //     Starts: '12:00 PM\n1:00 PM',
  //     Iqamah: '12:25 PM\n1:30 PM'
  //   },
  //   { Salah: '', Starts: '', Iqamah: '' },
  //   {
  //     Salah: 'Today: Jumada Al-Awwal 26, 1443\nAfter Maghrib: Jumada Al-Awwal 27',
  //     Starts: '',
  //     Iqamah: 'According to ChicagoHilal.org Updated: 12/31/2021 17:42:48'
  //   }
  // ]
  const a = csv
    .map(({ Iqamah }) => Iqamah)
    .filter(Boolean)
  // a.splice(3, 0, '-') // fix maghrib
  util.setIqamaTimes(ids[0], a)

  const j = csv
    .find(({ Salah }) => Salah.match(/^1st/))
    .Starts.split('\n')
  util.setJumaTimes(ids[0], j)

  return ids
}
exports.ids = ids
