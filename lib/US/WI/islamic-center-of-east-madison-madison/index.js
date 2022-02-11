const util = require('../../../util')

const ids = [
  {
    uuid4: 'bc61f96e-aa21-4463-bf1c-72ebf037e2d7',
    name: 'Islamic Center of East Madison',
    url: 'http://www.islamiccenterofeastmadison.com/',
    timeZoneId: 'America/Chicago',
    address: '4002 Lien Rd, Madison, WI 53704, USA',
    placeId: 'ChIJibxq3HNUBogRM8JxM2EPQaI',
    geo: {
      latitude: 43.12128490000001,
      longitude: -89.3145507
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, 'button')

  util.setTimes(ids[0], a)

  return ids
}

exports.ids = ids
