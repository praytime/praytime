
const util = require('../../../util')

const ids = [
  {
    uuid4: '65dcb0ba-d743-42cd-9fef-664d2efdf947',
    name: 'Sacramento Area League-Muslims',
    url: 'http://salamcenter.org/',
    timeZoneId: 'America/Los_Angeles',
    address: '4545 College Oak Dr, Sacramento, CA 95841, USA',
    placeId: 'ChIJj-D9ZcremoARxeDqqg6HZBU',
    geo: {
      latitude: 38.647282,
      longitude: -121.35102
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.nectar-list-item[data-text-align=right]').slice(1)
  const j = util.mapToText($, '.nectar-hor-list-item:contains("Khutba")')
    .map(util.extractTimeAmPm)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
