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
  }, {
    uuid4: 'e5a31f78-168d-48e2-ac7a-1e0f2664a934',
    name: 'Windermere Musallah',
    url: 'https://www.icorlando.org/winderemere-musallah.php',
    timeZoneId: 'America/New_York',
    address: '3554 W Orange Country Club Dr, Winter Garden, FL 34787, USA',
    placeId: 'ChIJAQAQ4VuB54gRNJJ4aORDWfY',
    geo: {
      latitude: 28.4997547,
      longitude: -81.5882168
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const prayerTable = $('th:contains("IQAAMA")').closest('table')
  const a = util.mapToText($, 'td:last-child', prayerTable)
    .filter(t => t.length)

  util.setIqamaTimes(ids[0], a)
  util.setIqamaTimes(ids[1], a)

  const j = a
    .slice(-1)
    .map(t => t.match(/khutbah\s*\d{1,2}\s*:\s*\d{1,2}\s*[ap]\.?m\.?/gi))
    .flat()
    .map(t => t.replace(/khutbah\s*/i, ''))

  util.setJumaTimes(ids[0], j)
  util.setJumaTimes(ids[1], j)

  return ids
}

exports.ids = ids
