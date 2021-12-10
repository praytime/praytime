
const util = require('../../../util')

const ids = [
  {
    uuid4: '6712513e-e66f-46f8-97d2-63cdc97b9797',
    name: 'Muslim Community Center of Greater San Diego',
    url: 'http://www.mccsandiego.org/',
    timeZoneId: 'America/Los_Angeles',
    address: '14698 Via Fiesta, San Diego, CA 92127, USA',
    placeId: 'ChIJbcF35in324ARCBcKMiyQI2U',
    geo: {
      latitude: 32.9919147,
      longitude: -117.1647551
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.time')
    .map(util.extractTimeAmPm)
    .slice(0, 7)

  util.setTimes(ids[0], a)

  return ids
}

exports.ids = ids
