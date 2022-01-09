const util = require('../../../util')

const ids = [
  {
    uuid4: 'cb14ec15-dcde-45fc-a835-9c89cb72c0ce',
    name: 'Masjid Al-Noor (Surrey Mosque)',
    url: 'http://www.awqat.net/Masjids/BCAlNoor/alnoor.html',
    timeZoneId: 'America/Vancouver',
    address: '13526 98A Ave, Surrey, BC V3T 1C8, Canada',
    placeId: 'ChIJ77dABNHZhVQRFScHeVf1vsw',
    geo: {
      latitude: 49.18138679999999,
      longitude: -122.8476144
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.prayer_entry:last-child')
  const j = util.mapToText($, '.prayer_entry:nth-child(2)').slice(5)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
