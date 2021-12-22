
const util = require('../../../util')

const ids = [
  {
    uuid4: 'ed7c16d4-83ae-4715-9dcd-b046af3998ad',
    name: 'Masjid At-Taqwa',
    url: 'https://www.masjidattaqwaatlanta.org/',
    timeZoneId: 'America/New_York',
    address: '2674 Woodwin Rd, Doraville, GA 30360, USA',
    placeId: 'ChIJXdyTIOUJ9YgRHWgJVZXToEE',
    geo: {
      latitude: 33.919032,
      longitude: -84.278033
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, 'tr:contains("Salath") ~ tr td:last-child')
  a.splice(1, 1) // remove sunrise
  const j = a
    .slice(-1)
    .map(util.matchTimeAmPmG)
    .flat()

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
