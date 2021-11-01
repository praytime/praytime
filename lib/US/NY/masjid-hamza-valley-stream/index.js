
const util = require('../../../util')

const ids = [
  {
    uuid4: '5c651bdd-fdb9-4ab6-b4cd-eba5ea425cec',
    name: 'Masjid Hamza',
    url: 'https://www.masjidhamza.com/',
    timeZoneId: 'America/New_York',
    address: '202 Stuart Ave, Valley Stream, NY 11580, USA',
    placeId: 'ChIJs8LPRY5jwokRNNJagxfUY3E',
    geo: {
      latitude: 40.6857947,
      longitude: -73.7162058
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.dptTimetable td:last-child')
  a.splice(1, 1) // remove sunrise

  util.setTimes(ids[0], a)

  return ids
}

exports.ids = ids
