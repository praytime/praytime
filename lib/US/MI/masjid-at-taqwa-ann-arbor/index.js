
const util = require('../../../util')

const ids = [
  {
    uuid4: 'd5efbd90-a918-481d-982e-90379f5975e6',
    name: 'Masjid At-Taqwa',
    url: 'http://masjidattaqwa.org/',
    timeZoneId: 'America/Detroit',
    address: '2680 Golfside Rd, Ann Arbor, MI 48108, USA',
    placeId: 'ChIJXbuZp9yoPIgRVOMrNTmT_N8',
    geo: {
      latitude: 42.24916,
      longitude: -83.661371
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, 'table.prayer-time td:last-child')
  a.splice(1, 1) // remove sunrise
  util.setIqamaTimes(ids[0], a)

  return ids
}

exports.ids = ids
