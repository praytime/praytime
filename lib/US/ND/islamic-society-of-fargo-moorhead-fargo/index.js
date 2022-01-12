const util = require('../../../util')

const ids = [
  {
    uuid4: '597e0150-29ff-499c-b525-06a8f71c63d3',
    name: 'Islamic Society of Fargo-Moorhead',
    url: 'http://www.islamnd.org/',
    timeZoneId: 'America/Chicago',
    address: '601 28th St S, Fargo, ND 58103, USA',
    placeId: 'ChIJxyGs-ezLyFIR8T8GKErBbxw',
    geo: {
      latitude: 46.86848519999999,
      longitude: -96.8254772
    }
  }, {
    uuid4: '3abc7798-162d-47f8-9f93-275663ea3dbf',
    name: 'Moorhead Fargo Islamic Center',
    url: 'http://www.islamnd.org/',
    timeZoneId: 'America/Chicago',
    address: '2215 12th Ave S, Moorhead, MN 56560, USA',
    placeId: 'ChIJwW-fFNXIyFIRTfTGQmlNhVk',
    geo: {
      latitude: 46.8619232,
      longitude: -96.7452392
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, 'td:last-child', $('#MainContent_lblFajr').closest('tbody'))
    .filter(util.matchTimeAmPm)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], ['check website'])

  return ids
}

exports.ids = ids
