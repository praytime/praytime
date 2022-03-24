const util = require('../../../util')

const ids = [
  {
    uuid4: 'a58b85c1-fd14-4165-a063-daa9b48c129d',
    name: 'Islamic Center of Passaic County (Paterson)',
    url: 'http://www.icpcnj.org/',
    timeZoneId: 'America/New_York',
    address: '152 Derrom Ave, Paterson, NJ 07504, USA',
    placeId: 'ChIJBegs92z8wokRtyGWl5NxwA4',
    geo: {
      latitude: 40.9176236,
      longitude: -74.1401874
    }
  },
  {
    uuid4: 'd7d9575f-0477-49cc-88dd-43b391cc0460',
    name: 'Islamic Center of Passaic County (Clifton)',
    url: 'http://www.icpcnj.org/',
    timeZoneId: 'America/New_York',
    address: '257 Pershing Rd, Clifton, NJ 07013, USA',
    placeId: 'ChIJI8wBqqr_wokR-cAFGiZf-GE',
    geo: {
      latitude: 40.85962819999999,
      longitude: -74.17007850000002
    }
  },
  {
    uuid4: '652310ad-e3d0-4a44-bafe-54e5189db405',
    name: 'Islamic Center of Passaic County (Masjid Younis)',
    url: 'http://www.icpcnj.org/',
    timeZoneId: 'America/New_York',
    address: '190 Haledon Ave, Prospect Park, NJ 07508, USA',
    placeId: 'ChIJZRk8C739wokR1q3fpF_31hI',
    geo: {
      latitude: 40.93241159999999,
      longitude: -74.1751743
    }
  }
]

exports.run = async () => {
  const $ = await util.load('https://us.mohid.co/nj/paterson/icpc/masjid/widget/api/index/?m=prayertimings')

  const a = util.mapToText($, '.prayer_iqama_div')
  a.splice(0, 1) // remove header
  util.setIqamaTimes(ids[0], a)
  util.setIqamaTimes(ids[1], a)
  util.setIqamaTimes(ids[2], a)

  // matching:
  // 1st Jumuah - Paterson/Clifton\t12:15 PM
  // 2nd Jumuah - Paterson/Clifton\t01:15 PM
  // 1st Jumuah - Masid Younis\t01:15 PM
  const j = util.mapToText($, '.prayer li').filter((t) => t.match(/jumuah/i))
  util.setJumaTimes(ids[0], j
    .filter((t) => t.match(/paterson/i))
    .map((t) => t.match(/\d+\s*:\s*\d+/)[0]))
  util.setJumaTimes(ids[1], j
    .filter((t) => t.match(/clifton/i))
    .map((t) => t.match(/\d+\s*:\s*\d+/)[0]))
  util.setJumaTimes(ids[2], j
    .filter((t) => t.match(/Prospect Park/i))
    .map((t) => t.match(/\d+\s*:\s*\d+/)[0]))

  return ids
}

exports.ids = ids
