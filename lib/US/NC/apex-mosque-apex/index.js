const util = require('../../../util')

const ids = [
  {
    uuid4: 'f1cd423f-daef-40c5-b074-18f0613b3801',
    name: 'Apex Mosque',
    url: 'http://www.apexmosque.org/',
    timeZoneId: 'America/New_York',
    address: '733 Center St, Apex, NC 27502, USA',
    placeId: 'ChIJuSIwU6aSrIkRpc40xGuB12A',
    geo: {
      latitude: 35.7296577,
      longitude: -78.8410203
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.jamah')
  const j = util.mapToText($, '.gridtable tr:nth-child(2) td:last-child')
    .map(util.matchTimeG)
    .flat()

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)
  return ids
}

exports.ids = ids
