const util = require('../../../util')

const ids = [
  {
    uuid4: '5b0ac5ac-cc16-48ef-94cf-5bb695d2a062',
    name: 'Mansfield Islamic Center',
    url: 'https://mansfieldmasjid.org/',
    timeZoneId: 'America/Chicago',
    address: '6401 New York Ave # 135, Arlington, TX 76018, USA',
    geo: {
      latitude: 32.642461,
      longitude: -97.074488
    },
    placeId: 'ChIJeTgrLsaJToYRtcOVJIVkLBw'
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.elementor-shortcode:contains("Iqama: ")')
    .map(util.extractTimeAmPm)
    .map(t => t === '' ? '-' : t)
  const j = util.mapToText($, '.elementor-widget-container > p:contains("Azan: ")')
    .filter(util.matchTime)
    .map(util.extractTime)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}
exports.ids = ids
