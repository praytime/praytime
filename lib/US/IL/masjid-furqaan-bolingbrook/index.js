const util = require('../../../util')

const ids = [
  {
    uuid4: '3a8fc827-c9b5-496f-acc2-296268a3e980',
    name: 'Masjid Furqaan',
    url: 'https://bolingbrook.masjidfurqaan.org/',
    timeZoneId: 'America/Chicago',
    address: '401 W Boughton Rd, Bolingbrook, IL 60440, USA',
    placeId: 'ChIJJbNIRyJbDogRXZVVB0lQREw',
    geo: {
      latitude: 41.7066122,
      longitude: -88.0835115
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.dpt_jamah')
  a.splice(0, 1) // remove header
  const j = util.mapToText($, '.dsJumuah-vertical')

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], [j[0]])

  return ids
}

exports.ids = ids
