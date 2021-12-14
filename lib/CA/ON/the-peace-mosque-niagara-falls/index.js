
const util = require('../../../util')

const ids = [
  {
    uuid4: 'abe7fef6-84f6-41fb-8606-4179e59de7c5',
    name: 'The Peace Mosque',
    url: 'https://niagarafallsislamiccenter.com/',
    timeZoneId: 'America/Toronto',
    address: '6735 Caledonia St, Niagara Falls, ON L2G 5A6, Canada',
    placeId: 'ChIJe6VzKIdD04kRmZoOEQHeWkk',
    geo: {
      latitude: 43.0737456,
      longitude: -79.1069682
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, 'td:last-child', $('td:contains("Iqama")').closest('tbody')).slice(1)

  util.setTimes(ids[0], a)

  return ids
}

exports.ids = ids
