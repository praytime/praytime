
const util = require('../../../util')

const ids = [
  {
    uuid4: '652ef10c-b8d9-4491-a80b-e0ef890c8bc2',
    name: 'Masjid Al Salam',
    url: 'http://www.masjidalsalam.org/',
    timeZoneId: 'America/Chicago',
    address: '16700 Old Louetta Rd, Spring, TX 77379, USA',
    placeId: 'ChIJMzgaXJ3SQIYRm1GiuP2fH78',
    geo: {
      latitude: 30.0090816,
      longitude: -95.5601962
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  // dev console:
  // Array.from($qsaA('th').filter((e) => e.textContent.match(/IQAMAH/))[0].closest('table').querySelectorAll('td:last-child')).map((e)=>e.textContent.trim()).filter((t) => t.length)
  // find th containing iqamah, find parent table, search down from there
  const prayerTable = $('th:contains("IQAMAH")').closest('table')
  const a = $('td:last-child', prayerTable).map((_, v) => $(v).text().trim()).toArray().filter((t) => t.length)
  const j = $('td:nth-child(2)', prayerTable).map((_, v) => $(v).text().trim()).toArray().filter((t) => t.length && t.match(/\d+\s*:\s*\d+/)).slice(-3)

  // const j = a[a.length - 1].match(/\d+\s*:\s*\d+\s*\w+/g)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
