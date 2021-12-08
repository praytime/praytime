
const util = require('../../../util')

const ids = [
  {
    uuid4: '31fcb158-9de2-4739-96df-cc4db4688189',
    name: 'Masjid Hidayath (Islamic Center of Aurora)',
    url: 'http://masjidhidayath.com/',
    timeZoneId: 'America/Chicago',
    address: '543 S Lake St, Aurora, IL 60506, USA',
    placeId: 'ChIJaahZgKPlDogRueGjTIdJgUA',
    geo: {
      latitude: 41.7517794,
      longitude: -88.3298903
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const aa = util.mapToText($, 'h3 + p')
    .map(util.matchTimeAmPmG)

  util.setIqamaTimes(ids[0], aa[0].slice(1))
  util.setJumaTimes(ids[0], aa[1])

  return ids
}

exports.ids = ids
