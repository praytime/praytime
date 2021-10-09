const util = require('../../../util')

const ids = [
  {
    uuid4: 'aaebd1a9-8a8d-401a-aab9-77e3b32e5ce7',
    name: 'McLean Islamic Center',
    url: 'http://mcleanmuslims.org/',
    address: '8800 Jarrett Valley Dr, Vienna, VA 22182, USA',
    timeZoneId: 'America/New_York',
    placeId: 'ChIJCQzQpF61t4kRYD9H56t-xBw',
    geo: {
      latitude: 38.93558,
      longitude: -77.248851
    }
  }
]

exports.run = async () => {
  const $ = await util.load('https://themasjidapp.net/masjids/mic/prayers')

  const a = util.mapToText($, 'tbody td:last-child')

  a.splice(1, 1) // remove sunrise

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], a.slice(5).map((e) => e.match(/\d+\s*:\s*\d+\s*\w+/)[0]))

  return ids
}

exports.ids = ids
