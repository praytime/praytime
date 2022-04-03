const util = require('../../../util')

const ids = [
  {
    uuid4: '1dc7b228-edd9-434f-8ff2-0af0a1e771a7',
    name: 'At-Tawheed Islamic Center - IM\u0026RI',
    url: 'http://www.imrigr.org/',
    timeZoneId: 'America/Detroit',
    address: '3357 E Paris Ave SE, Kentwood, MI 49512, USA',
    placeId: 'ChIJBfO1_wRNGIgRdC7LEEfzk44',
    geo: {
      latitude: 42.9026323,
      longitude: -85.568969
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const pt = $('th:contains("Fajr")').closest('table')
  const jt = $('th:contains("khutbah")').closest('table')

  const a = util.mapToText($, 'tr:nth-child(2) td', pt)
  const j = util.mapToText($, 'tr:nth-child(2) td', jt)
    .map(util.extractTime)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
