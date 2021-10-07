const util = require('../../../util')

const results = [
  {
    uuid4: 'e4e3fa99-3df8-4e8c-8e37-5d353c2b51eb',
    name: 'Islamic Assocation of North Texas',
    url: 'https://iant.com/',
    timeZoneId: 'America/Chicago',
    address: '840 Abrams Rd, Richardson, TX 75081, USA',
    geo: {
      latitude: 32.939541,
      longitude: -96.730714
    },
    placeId: 'ChIJJ7Bj_J4fTIYRfWVohOA_w60'
  }
]

exports.run = async () => {
  const $ = await util.load(results[0].url)

  const a = util.mapToText($, 'table.dptTimetable td.jamah')
  const j = a[5].match(/\d+\s*:\s*\d+\s*\w+/g)

  util.setIqamaTimes(results[0], a)
  util.setJumaTimes(results[0], j)

  return results
}
