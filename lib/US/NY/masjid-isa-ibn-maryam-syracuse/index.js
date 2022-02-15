const util = require('../../../util')

const ids = [
  {
    uuid4: '8255b917-adb0-4d5a-9aeb-685783173fde',
    name: 'Masjid Isa Ibn Maryam',
    url: 'http://masjidisa.com/',
    timeZoneId: 'America/New_York',
    address: '501 Park St, Syracuse, NY 13203, USA',
    placeId: 'ChIJAxeGqVPy2YkRIdJkAvSDE4M',
    geo: {
      latitude: 43.062653,
      longitude: -76.1403164
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.jamah')
  const j = ['check website']

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
