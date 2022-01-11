const util = require('../../../util')

const ids = [
  {
    uuid4: '6a03f7d2-fa94-4e69-ac3a-cc253173143d',
    name: 'Islamic Center of Spokane',
    url: 'http://www.spokaneislamiccenter.org/',
    timeZoneId: 'America/Los_Angeles',
    address: '6411 E 2nd Ave, Spokane Valley, WA 99212, USA',
    placeId: 'ChIJOQIs_eUhnlQRX9KoOZBK7gA',
    geo: {
      latitude: 47.6556162,
      longitude: -117.3180045
    }
  }
]

exports.run = async () => {
  const $ = await util.load('http://www.muslimfeed.com/timesframe.aspx?mi=2044')

  const a = util.mapToText($, '#tblDailyTimes td:last-child')
    .filter(util.matchTime)

  util.setTimes(ids[0], a)

  return ids
}

exports.ids = ids
