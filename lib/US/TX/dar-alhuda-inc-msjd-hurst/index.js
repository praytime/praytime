
const util = require('../../../util')

const ids = [
  {
    uuid4: '98f01538-d4f3-4325-b064-cfd2e2e9bdaa',
    name: 'Dar Alhuda Inc مسجد',
    url: 'http://www.masjiddaralhuda.com/',
    timeZoneId: 'America/Chicago',
    address: '1245 Karla Dr, Hurst, TX 76053, USA',
    placeId: 'ChIJC1hNWyt_ToYRAZM_rWwLe6w',
    geo: {
      latitude: 32.8331572,
      longitude: -97.17820780000001
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.jamah')
  const j = util.mapToText($, 'p:contains("Jumaa") span').slice(0)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
