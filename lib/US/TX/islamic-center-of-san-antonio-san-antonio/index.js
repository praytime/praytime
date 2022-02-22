
const util = require('../../../util')

const ids = [
  {
    uuid4: '51bb3385-287e-4f46-82cd-9a059ec4fb9f',
    name: 'Islamic Center of San Antonio',
    url: 'http://www.icsaonline.org/',
    timeZoneId: 'America/Chicago',
    address: '8638 Fairhaven St, San Antonio, TX 78229, USA',
    placeId: 'ChIJc6BFAK9gXIYRKKYSv50VmiU',
    geo: {
      latitude: 29.52070550000001,
      longitude: -98.56413309999999
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.mk-time b')
    .filter(util.matchTime)

  util.setTimes(ids[0], a)

  return ids
}

exports.ids = ids
