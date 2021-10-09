const util = require('../../../util')

const ids = [
  {
    uuid4: 'dfab4495-7f4a-4cf7-998f-d7056fff7e97',
    name: 'McKinney Islamic Association',
    url: 'http://www.mckinneymasjid.org/',
    address: '2940 Eldorado Pkwy, McKinney, TX 75070, USA',
    geo: {
      latitude: 33.169004,
      longitude: -96.66308
    },
    placeId: 'ChIJeYmpKVURTIYRKFS4Iqx0hfY',
    timeZoneId: 'America/Chicago'
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  util.setIqamaTimes(ids[0], util.mapToText($, '.dpt_jamah').slice(1))

  const j = util.mapToText($, 'td.prayerName.sunrise')[1].match(/\d{1,2}\s*:\s*\d{1,2}/g)
  util.setJumaTimes(ids[0], j)

  return ids
}
exports.ids = ids
