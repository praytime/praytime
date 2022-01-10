const util = require('../../../util')

const ids = [
  {
    uuid4: 'c6be683c-1a36-4739-9b47-2b63eedfb1c1',
    name: 'Islamic Center of Seattle',
    url: 'http://www.assalammasjid.com/',
    timeZoneId: 'America/Los_Angeles',
    address: '3040 S 150th St, SeaTac, WA 98188, USA',
    placeId: 'ChIJmfZK6D5DkFQRvaZwGLqJORo',
    geo: {
      latitude: 47.4691013,
      longitude: -122.2928708
    }
  }
]

exports.run = async () => {
  const data = await util.loadJson('https://masjidal.com/api/v1/time?masjid_id=E5AvJ0AX')

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

exports.ids = ids
