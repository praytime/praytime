const util = require('../../../util')

const ids = [
  {
    uuid4: '3d831335-0908-48b8-a30e-1f21d5d3e899',
    name: 'Masjid Al Farooq',
    url: 'https://www.mafchicago.com/',
    timeZoneId: 'America/Chicago',
    address: '8950 S Stony Island Ave, Chicago, IL 60617, USA',
    placeId: 'ChIJHXOKFykmDogRwk7cbmZqngM',
    geo: {
      latitude: 41.7316667,
      longitude: -87.58583329999999
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.mpt_daily td:last-child')
  const j = util.mapToText($, '.mpt_jumua .mpt_time').slice(0, 1) // only return first element

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
