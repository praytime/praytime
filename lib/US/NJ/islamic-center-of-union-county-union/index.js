
const util = require('../../../util')

const ids = [
  {
    uuid4: '5e03fdfa-bb10-473e-aa25-b1c2d3e92197',
    name: 'Islamic Center of Union County',
    url: 'http://www.icucnj.com/',
    timeZoneId: 'America/New_York',
    address: '2372 Morris Ave, Union, NJ 07083, USA',
    placeId: 'ChIJ5Ye2vL-tw4kR5KNMnO3_C0k',
    geo: {
      latitude: 40.7007623,
      longitude: -74.2866221
    }
  }
]

exports.run = async () => {
  const $ = await util.load('https://www.icucnj.com/salat-times/')

  const a = util.mapToText($, 'div#content p')
    .filter(util.matchTimeAmPm)
    .map(util.extractTimeAmPm)

  util.setTimes(ids[0], a)

  return ids
}

exports.ids = ids
