const util = require('../../../util')

const ids = [
  {
    uuid4: '44c0af76-9a5f-4c77-afc5-cad4f6a9c7fc',
    name: 'Masjid Al-Salaam',
    url: 'https://www.dccalsalam.org/',
    timeZoneId: 'America/Detroit',
    address: '3900 Schaefer Rd, Dearborn, MI 48126, USA',
    placeId: 'ChIJWdkqeIU0O4gRsApP7VhHZH0',
    geo: {
      latitude: 42.31642129999999,
      longitude: -83.17480239999999
    }
  }
]

exports.run = async () => {
  const $ = await util.load('https://us.mohid.co/mi/detroit/masjidalsalam/masjid/widget/api/index/?m=prayertimings')

  const a = util.mapToText($, '#daily .prayer_iqama_div')
  a.splice(0, 1) // remove header
  const j = util.mapToText($, '#jummah li')
    .filter((l) => l.match(/khutba/i))
    .map((l) => l.match(/\d+\s*:\s*\d+/g)[0])

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
