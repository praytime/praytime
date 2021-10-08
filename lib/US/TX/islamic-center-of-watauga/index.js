const util = require('../../../util')

const ids = [
  {
    uuid4: '1044f0dd-1925-4cef-a3fe-0e2a8e98c732',
    name: 'Islamic Center of Watauga',
    url: 'http://icwtx.com/',
    timeZoneId: 'America/Chicago',
    address: '6005 Chapman Rd, Watauga, TX 76148, USA',
    geo: {
      latitude: 32.868235,
      longitude: -97.251758
    },
    placeId: 'ChIJ5WpIyQl4ToYR32ky-pTtXeI'
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  util.setTimes(ids[0], util.mapToText($, 'aside#mh_display_prayer_times-3 td:last-child').slice(0, 6))

  return ids
}
