const util = require('../../../util')

const ids = [
  {
    uuid4: '9fa86588-f8aa-4077-adea-059575a22b58',
    name: 'Abubakar Asiddiq Islamic Center',
    url: 'http://masjidabubakar.org/',
    timeZoneId: 'America/New_York',
    address: '591 Industrial Mile Rd, Columbus, OH 43228, USA',
    placeId: 'ChIJcQPvyoGaOIgR9NIrjEOW45w',
    geo: {
      latitude: 39.9404466,
      longitude: -83.119351
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '#prayer_div td:last-child')
  a.splice(0, 2) // remove headers
  a.splice(1, 1) // remove sunrise

  util.setIqamaTimes(ids[0], a)
  // util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
