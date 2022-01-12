const util = require('../../../util')

const ids = [
  {
    uuid4: 'bd62178a-93e1-4dc7-959a-d6c73bf90260',
    name: 'Pullman Islamic Center',
    url: 'http://www.pullmanislamiccenter.org/',
    timeZoneId: 'America/Los_Angeles',
    address: '1155 NE Stadium Way, Pullman, WA 99163, USA',
    placeId: 'ChIJZfQNpOKGn1QRoMsP5HpvJWY',
    geo: {
      latitude: 46.7370429,
      longitude: -117.1656464
    }
  }
]

exports.run = async () => {
  const $ = await util.load('http://www.pullmanislamiccenter.org/api/getNamazTableVertical')

  const a = $('tr').toArray()
    .map(tr => $('td', tr).toArray())
    .filter(tds => tds.length === 2)
    .map(tds => tds.map(td => $(td).text().trim()))
    .map(tds => {
      if (util.matchTimeAmPm(tds[1])) {
        return util.extractTimeAmPm(tds[1])
      } else {
        return `${tds[0]} + ${tds[1]}`
      }
    })

  util.setTimes(ids[0], a)

  return ids
}

exports.ids = ids
