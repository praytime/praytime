const util = require('../../../util')

const results = [
  {
    uuid4: '1dd45b1c-ec70-449d-9243-b5984cc68c66',
    name: 'Islamic Association of Collin County',
    url: 'https://planomasjid.org',
    address: '6401 Independence Pkwy, Plano, TX 75023, USA',
    placeId: 'ChIJq9bOLqciTIYRCcB6F30aiXQ',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 33.059806,
      longitude: -96.751549
    }
  }
]

exports.run = async () => {
  const $ = await util.load('https://planomasjid.org')

  const a = util.mapToText($, $('div.prayer-schedule td:last-child'))

  a.splice(1, 1) // remove sunrise

  util.setTimes(results[0], a)

  return results
}
