const util = require('../../../util')

const ids = [
  {
    uuid4: '79d3f064-733a-40c8-886c-5b76e845ed0c',
    name: "Masjid Ahlul Qur'aan Wa Sunnah",
    url: 'http://maqws.org/',
    timeZoneId: 'America/New_York',
    address: '135-11 125th St, Queens, NY 11420, USA',
    placeId: 'ChIJo1f3TxRnwokR5tQ9gaf05fo',
    geo: {
      latitude: 40.6689139,
      longitude: -73.8143
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  util.setIqamaTimes(ids[0], [
    $('div.cl-prayer-flex h4:contains("Fajr") + h6').text().match(/(\d{1,2}:\d{2}\s+\w+)/g)[1],
    $('div.cl-prayer-flex h4:contains("Dhuhr") + h6').text().match(/(\d{1,2}:\d{2}\s+\w+)/g)[1],
    $('div.cl-prayer-flex h4:contains("Asr") + h6').text().match(/(\d{1,2}:\d{2}\s+\w+)/g)[1],
    $('div.cl-prayer-flex h4:contains("Maghrib") + h6').text().match(/(\d{1,2}:\d{2}\s+\w+)/g)[1],
    $('div.cl-prayer-flex h4:contains("Isha") + h6').text().match(/(\d{1,2}:\d{2}\s+\w+)/g)[1]
  ])
  util.setJumaTimes(ids[0], util.mapToText($, '.prayer_table td.subtext')
    .filter(t => t.length))

  return ids
}

exports.ids = ids
