
const util = require('../../../util')

const ids = [
  {
    uuid4: '665a3164-1f93-4cdc-93d4-0d0a3436078c',
    name: 'Medical Center Islamic Society (New Almeda Masjid)',
    url: 'https://masjid.mcisonline.net/',
    timeZoneId: 'America/Chicago',
    address: '2222 Mansard St, Houston, TX 77054, USA',
    placeId: 'ChIJF82xDKrqQIYRmUEW428shBM',
    geo: {
      latitude: 29.6778722,
      longitude: -95.3969925
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.dpt_jamah')
  const j = ['check website']

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
