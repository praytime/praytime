const util = require('../../../util')

const ids = [
  {
    uuid4: 'ec38b9ab-8b65-4b81-ab67-89c434fd1407',
    name: 'Masjid Haqq',
    url: 'http://www.masjidhaqq.org',
    address: '1620 S Highland, Lombard, IL 60148, USA',
    placeId: 'ChIJzenX43dSDogRqs8NAk0mFOY',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 41.851883,
      longitude: -88.012403
    },
    fajrIqama: 'check website',
    zuhrIqama: 'check website',
    asrIqama: 'check website',
    maghribIqama: 'check website',
    ishaIqama: 'check website',
    juma1: 'check website'
  }
]

exports.run = async () => {
  const data = await util.loadJson(
    'https://masjidal.com/api/v1/time?masjid_id=8K9OvEAp'
  )

  if (data.status === 'success') {
    const iqama = data.data.iqama
    util.setTimes(ids[0], [
      iqama.fajr,
      iqama.zuhr,
      iqama.asr,
      iqama.maghrib,
      iqama.isha,
      iqama.jummah1,
      iqama.jummah2
    ])
  }

  return ids
}

// ChIJCRyh63dSDogRGYvZ9jdS8zk
// ChIJCRyh63dSDogRYuFT6JDAcLM

exports.ids = ids
