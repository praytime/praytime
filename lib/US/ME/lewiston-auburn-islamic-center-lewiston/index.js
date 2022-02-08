const util = require('../../../util')

const ids = [
  {
    uuid4: 'faef4be0-6fa3-4c76-89dc-136e5806a34f',
    name: 'Lewiston/Auburn Islamic Center',
    url: 'http://laislamiccenter.com/',
    timeZoneId: 'America/New_York',
    address: '21 Lisbon St, Lewiston, ME 04240, USA',
    placeId: 'ChIJa4bob8RrskwRtrEWjjryv_4',
    geo: {
      latitude: 44.09828919999999,
      longitude: -70.218144
    }
  }
]

exports.run = async () => {
  // xmlMode: true so that script tags don't get special treatment
  const $ = await util.load(ids[0].url, { cheerio: { xmlMode: true } })

  const d = util.mapToText($, 'script#__NEXT_DATA__')
    .map(JSON.parse)
    .map(j => j.props.pageProps.initialData.sections.find(s => s.name === 'Prayer Times').data)
    .shift()

  util.setIqamaTimes(ids[0], [
    d.prayers.find(p => p.prayerName === 'Fajr').prayerTime,
    d.prayers.find(p => p.prayerName === 'Zuhr').prayerTime,
    d.prayers.find(p => p.prayerName === 'Asr').prayerTime,
    d.prayers.find(p => p.prayerName === 'Magrib').prayerTime,
    d.prayers.find(p => p.prayerName === 'Isha').prayerTime
  ])

  util.setJumaTimes(ids[0], d.jumuahs.map(j => j.jumuaTiming))

  return ids
}

exports.ids = ids
