const util = require('../../../util')

const ids = [
  {
    uuid4: 'beae424f-dda0-46d4-9e19-fc13d395df97',
    name: 'Darul Arqum Islamic Center',
    url: 'http://arqum.org/',
    timeZoneId: 'America/Chicago',
    address: '1212 Iowa Ave, Ames, IA 50014, USA',
    placeId: 'ChIJc9ZOlLNw7ocRGpZaA8iRyaI',
    geo: {
      latitude: 42.03388890000001,
      longitude: -93.6586111
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  $('.prayerHomeTable tr:contains("Sunrise")').remove()

  const a = util.mapToText($, '.prayerHomeTable td:last-child')
  const j = util.mapToText($, '.timings > strong')
    .map(util.extractTimeAmPm)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
