
const util = require('../../../util')

const ids = [
  {
    uuid4: 'dd1bc539-cafe-4f39-b21d-f2a51e9040e7',
    name: 'Islamic Center of Ann Arbor (MCA)',
    url: 'http://mca-a2.org/',
    timeZoneId: 'America/Detroit',
    address: '2301 Plymouth Rd, Ann Arbor, MI 48105, USA',
    placeId: 'ChIJoTX09ymsPIgRO8InMPpKP-4',
    geo: {
      latitude: 42.3011923,
      longitude: -83.714602
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  util.setTimes(ids[0], util.mapToText($, '.jamah'))

  return ids
}

exports.ids = ids
