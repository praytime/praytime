
const util = require('../../../util')

const ids = [
  {
    uuid4: '76667470-6e6e-4d16-9cb4-80926640d023',
    name: 'Attawheed Islamic Center',
    url: 'http://www.attawheed.org/',
    timeZoneId: 'America/New_York',
    address: '401 Washington Ave, Carnegie, PA 15106, USA',
    placeId: 'ChIJBejK-cz3NIgRN6dEpPBaUEA',
    geo: {
      latitude: 40.4093101,
      longitude: -80.0834061
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const aa = util.mapToTextPreserveBreaks($, 'h2:contains("Iqamah Timings") + div')
    .map(t => t.split('\n'))
    .shift()
    .map(t => t.trim())
    .filter(t => t.length > 0)

  // console.error(aa)
  // [
  //   'Saturday, Apr. 9, 2022 - Friday, Apr. 15, 2022',
  //   'Fajr: 6:00 am',
  //   'Duhr: 2:00 pm',
  //   "'Asr: 5:30 pm",
  //   'Maghrib: Sunset + 10 mins',
  //   "'Isha: On Time ('Isha time from Friday April 1 is subject to Taraweeh Schedule)",
  //   '​',
  //   "Jumu'ah Timings",
  //   '​',
  //   "1st Jumu'ah : 12:00 pm",
  //   "2nd Jumu'ah: 1:10 pm"
  // ]

  util.setIqamaTimes(ids[0], [
    aa.find(t => t.includes('Fajr:')),
    aa.find(t => t.includes('Duhr:')),
    aa.find(t => t.includes('Asr:')),
    aa.find(t => t.includes('Maghrib:')),
    aa.find(t => t.includes('Isha:'))
  ])
  util.setJumaTimes(ids[0], aa
    .filter(t => t.match(/(1st|2nd)\s+Jumu/)))

  return ids
}

exports.ids = ids
