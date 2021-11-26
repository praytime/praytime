
const util = require('../../../util')

const ids = [
  {
    uuid4: '1b263d44-0d3c-4e51-8ef8-292a43cca1f9',
    name: 'Islamic Center of San Gabriel Valley (ICSGV)',
    url: 'http://www.icsgv.com/',
    timeZoneId: 'America/Los_Angeles',
    address: '19164 E Walnut Dr N, Rowland Heights, CA 91748, USA',
    placeId: 'ChIJW0yKg1Yqw4ARE3w2TXosuPE',
    geo: {
      latitude: 33.9949473,
      longitude: -117.8846553
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.jamah')

  util.setIqamaTimes(ids[0], a)

  if (util.isJumaToday(ids[0])) {
    util.setJumaTimes(ids[0], [a[1]])
  } else {
    // TODO: check on non-juma day
    util.setJumaTimes(ids[0], ['check website'])
  }

  return ids
}

exports.ids = ids
