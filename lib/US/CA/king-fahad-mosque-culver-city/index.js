
const util = require('../../../util')

const ids = [
  {
    uuid4: '874eacd8-2ecd-41d9-a640-faa584a06371',
    name: 'King Fahad Mosque',
    url: 'https://kingfahadmosque.org/',
    timeZoneId: 'America/Los_Angeles',
    address: '10980 Washington Blvd, Culver City, CA 90232, USA',
    placeId: 'ChIJS9p7_Du6woARqiQg7bYvC-0',
    geo: {
      latitude: 34.0115623,
      longitude: -118.4101486
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.prayer_name_time button')

  util.setTimes(ids[0], a)

  return ids
}

exports.ids = ids
