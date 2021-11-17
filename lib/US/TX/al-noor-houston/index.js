
const util = require('../../../util')

const ids = [
  {
    uuid4: '2690ffd9-9571-4ed9-8689-0ee441f4dda2',
    name: 'Al-Noor',
    url: 'https://www.alnoormasjid.org/',
    timeZoneId: 'America/Chicago',
    address: '6443 Prestwood Dr, Houston, TX 77081, USA',
    placeId: 'ChIJJyShQzTCQIYR8WNe7eJ9j5A',
    geo: {
      latitude: 29.7180085,
      longitude: -95.4938976
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, 'h2:contains("Jamaat Timing") + table td:last-child')

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], a
    .slice(5)
    .map(t => t.match(/\d+\s*:\s*\d+/).shift())) // sanitize juma times

  return ids
}

exports.ids = ids
