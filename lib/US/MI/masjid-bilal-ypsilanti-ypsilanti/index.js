
const util = require('../../../util')

const ids = [
  {
    uuid4: '1d8976de-c584-4a2b-99e3-be5028be2f18',
    name: 'Masjid Bilal Ypsilanti',
    url: 'https://masjidbilalmi.org/',
    timeZoneId: 'America/Detroit',
    address: '4891 W Michigan Ave, Ypsilanti, MI 48197, USA',
    placeId: 'ChIJrcRq-xymPIgRo-RUg8cnxuM',
    geo: {
      latitude: 42.216283,
      longitude: -83.6647372
    }
  }
]

exports.run = async () => {
  const $ = await util.load('https://assalam.info/widget/MBY/1/0')

  const a = util.mapToText($, '.mptwidgetdiv table td:last-child').filter((t) => t.match(/\d{1,2}\s*:\s*\d{1,2}/))
  a.splice(1, 1) // remove sunrise
  const j = a[5].match(/\d+\s*:\s*\d+\s*\w+/g)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
