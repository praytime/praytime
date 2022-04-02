
const util = require('../../../util')

const ids = [
  {
    uuid4: '30b6a3fe-f388-4b2a-b625-96eafcac3b32',
    name: 'Berkeley Masjid',
    url: 'http://www.berkeleymasjid.org/',
    timeZoneId: 'America/Los_Angeles',
    address: '2716 Derby St, Berkeley, CA 94705, USA',
    placeId: 'ChIJGdUjuDJ8hYARRs6rg3L_tus',
    geo: {
      latitude: 37.8619778,
      longitude: -122.2527
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, 'ul.top_bar_contact_list')
    .map(t => t.split(/\s*[a-zA-Z']+\s*:\s*/))
    .flat()
    .filter(t => t.length)

  util.setTimes(ids[0], a)

  return ids
}

exports.ids = ids
