const util = require('../../../util')

const ids = [
  {
    uuid4: '1563a69b-ca08-4ee8-90b8-75320349643d',
    name: 'Abubakar As-Sadique Islamic Center',
    url: 'http://abuubakar.org/',
    timeZoneId: 'America/Chicago',
    address: '2824 13th Ave S, Minneapolis, MN 55407, USA',
    placeId: 'ChIJ71OaigAo9ocR2JSrTMnjjFg',
    geo: {
      latitude: 44.9511111,
      longitude: -93.2566667
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  // TODO: check for re-opening of daily salat
  // util.setIqamaTimes(ids[0], a)

  util.setJumaTimes(ids[0], util.mapToText($, '.jumuatime .subtext'))

  return ids
}

exports.ids = ids
