
const util = require('../../../util')

const ids = [
  {
    uuid4: 'c6c12d0c-210a-4661-92b3-ba5386c0565f',
    name: 'Jama Masjid of Orlando',
    url: 'https://www.icorlando.org/',
    timeZoneId: 'America/New_York',
    address: '11543 Ruby Lake Rd, Orlando, FL 32836, USA',
    placeId: 'ChIJbf5Drw-A3YgRx1iDPHb_zJE',
    geo: {
      latitude: 28.398432,
      longitude: -81.50288479999999
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const prayerTable = $('th:contains("IQAAMA")').closest('table')
  const a = $('td:last-child', prayerTable)
    .map((_, v) => $(v).text().trim())
    .toArray()
    .filter((t) => t.length)

  // const a = util.mapToText($, 'div#prayer-times div.prayer-row > div:last-child')
  // const j = a[a.length - 1].match(/\d+\s*:\s*\d+\s*\w+/g)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], ['check website'])

  return ids
}

exports.ids = ids
