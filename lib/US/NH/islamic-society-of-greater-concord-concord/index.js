const util = require('../../../util')

const ids = [
  {
    uuid4: 'cd9f3c8d-9da8-490b-9c27-1dde5fb3dbb4',
    name: 'Islamic Society of Greater Concord',
    url: 'http://iisgc.org/',
    timeZoneId: 'America/New_York',
    address: '181 N Main St, Concord, NH 03301, USA',
    placeId: 'ChIJe-jD6g9r4okRgi7F5xhtPTk',
    geo: {
      latitude: 43.2119542,
      longitude: -71.54019869999999
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, 'td:last-child', $('div.wcustomhtml td:contains("Fajr")').closest('table'))
  const j = util.mapToText($, 'div strong:contains("Jum\'ah")')
    .map(util.extractTime)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
