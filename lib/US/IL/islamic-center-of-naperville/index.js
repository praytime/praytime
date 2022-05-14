const util = require('../../../util')

const ids = [
  {
    uuid4: 'd7c67298-6f4b-4694-a157-1ece31bc3294',
    name: 'Islamic Center of Naperville (Ogden)',
    url: 'http://islamiccenterofnaperville.org',
    address: '2844 West Ogden Ave, Naperville IL, 60540, USA',
    timeZoneId: 'America/Chicago',
    placeId: 'ChIJnw5viS74DogRlFBTHUQ89Dk',
    geo: {
      latitude: 41.753933,
      longitude: -88.201616
    }
  },
  {
    uuid4: 'fefae38d-2e93-48fc-8bc2-6cb6f93a964e',
    name: 'Islamic Center of Naperville (Olesen)',
    url: 'http://islamiccenterofnaperville.org',
    address: '450 Olesen Dr, Naperville, IL 60540, USA',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 41.768289,
      longitude: -88.120149
    },
    placeId: 'ChIJiYkXUXJXDogRpL27TOZv-ao'
    // ChIJU-yM6JlXDogR-sHB67afJNc
  },
  {
    uuid4: '68651d83-7b84-4440-902f-e43bc95c46c8',
    name: 'Islamic Center of Naperville (75th St)',
    url: 'http://islamiccenterofnaperville.org',
    timeZoneId: 'America/Chicago',
    address: '25W530 75th St, Naperville, IL 60565, USA',
    geo: {
      latitude: 41.749155,
      longitude: -88.121487
    },
    placeId: 'ChIJV0Yh3QpXDogRFGdLiBCkVfo'
    // https://www.google.com/maps/search/?api=1&query=none&query_place_id=ChIJp4GFjXxXDogRXBXbY3b7ww0
    // https://www.google.com/maps/search/?api=1&query=none&query_place_id=ChIJGYlpVBj4DogRxJpMyX6TA00
    // https://www.google.com/maps/search/?api=1&query=none&query_place_id=ChIJV0Yh3QpXDogRFGdLiBCkVfo
  }
]

// ChIJXzlvkA1XDogRU_798w06fu4 - 248th place holder?

exports.run = async () => {
  // ogden: https://masjidal.com/widget/monthly/masjid_id=pQKMn3LB&label_athan=ATHAN&label_iqamah=IQAMAH
  // olesen: https://masjidal.com/widget/monthly/?masjid_id=y0LboaAo&label_athan=ATHAN&label_iqamah=IQAMAH
  // 75th:  https://masjidal.com/widget/monthly/?masjid_id=BYADpxAN&label_athan=ATHAN&label_iqamah=IQAMAH
  const dd = await Promise.all([
    util.loadJson('https://masjidal.com/api/v1/time?masjid_id=pQKMn3LB'),
    util.loadJson('https://masjidal.com/api/v1/time?masjid_id=y0LboaAo'),
    util.loadJson('https://masjidal.com/api/v1/time?masjid_id=BYADpxAN')
  ])

  dd.forEach((d, i) => {
    if (d.status === 'success') {
      const iqama = d.data.iqama
      util.setIqamaTimes(ids[i], [
        iqama.fajr,
        iqama.zuhr,
        iqama.asr,
        iqama.maghrib,
        iqama.isha
      ])
      util.setJumaTimes(ids[i], [
        iqama.jummah1,
        iqama.jummah2,
        iqama.jummah3
      ])
    }
  })

  return ids
}

exports.ids = ids
