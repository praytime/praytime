
const util = require('../../../util')

const ids = [
  {
    uuid4: '489c8152-7ac5-4794-a08c-438f0983c847',
    name: 'Muslim Community of New Jersey Masjid',
    url: 'http://www.mcnjonline.com/',
    timeZoneId: 'America/New_York',
    address: '15 S 2nd St, Fords, NJ 08863, USA',
    placeId: 'ChIJm1Mu1wa2w4kR4Js0BYMtra4',
    geo: {
      latitude: 40.52988,
      longitude: -74.3151512
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.mpt_daily td:last-child')
  const j = util.mapToText($, '.mpt_jumua td:nth-child(2)')

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
