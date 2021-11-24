const util = require('../../../util')

const ids = [
  {
    uuid4: '12575fb9-d1c0-48c0-8204-eae3e3425c16',
    name: 'Islamic Circle of North America (ICNA)',
    url: 'http://icnamarkaz.org/',
    timeZoneId: 'America/New_York',
    address: '166-26 89th Ave, Queens, NY 11432, USA',
    placeId: 'ChIJ-0gLAyBhwokRTjMvNAoDzIg',
    geo: {
      latitude: 40.708152,
      longitude: -73.794282
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.begins')
  a.splice(1, 1) // remove sunrise

  util.setIqamaTimes(ids[0], a)

  // start with .dptTimetable, search up to containing section tag,
  // and search for h3 tags under that
  const j = util.mapToText($, 'h3', $('.dptTimetable').closest('section'))
    .filter(util.matchTimeAmPm) // filter out header columns
    .map(util.matchTimeAmPmG) // convert to array of juma times
    .pop() // return last element which is array of juma times

  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
