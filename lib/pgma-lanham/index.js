const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: 'a5c8e3f5-25fe-46d6-813c-e86f8002a7a6',
    name: "Prince George's Muslim Association",
    url: 'http://pgmamd.org',
    address: '9150 Lanham Severn Rd, Lanham, MD 20706, USA',
    placeId: 'ChIJu9mKv73Bt4kRu9BSvbTPfDU',
    timeZoneId: 'America/New_York',
    geo: {
      latitude: 38.967486,
      longitude: -76.856091
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://pgmamd.org')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $('#ctlHomeMasjid_ctlPrayerTimes_lblFajrIqamah').text().trim().replace('.', ':')
  results[0].zuhrIqama = $('#ctlHomeMasjid_ctlPrayerTimes_lblDhuhrIqamah').text().trim()
  results[0].asrIqama = $('#ctlHomeMasjid_ctlPrayerTimes_lblAsrIqamah').text().trim()
  results[0].maghribIqama = $('#ctlHomeMasjid_ctlPrayerTimes_lblMaghribIqamah').text().trim()
  results[0].ishaIqama = $('#ctlHomeMasjid_ctlPrayerTimes_lblIshaIqamah').text().trim()
  results[0].juma1 = $('#ctlHomeMasjid_ctlPrayerTimes_lblJummahPrayer').text().match(/\d{1,2}:\d{2}/g)[0]
  results[0].juma2 = $('#ctlHomeMasjid_ctlPrayerTimes_lblJummahPrayer').text().match(/\d{1,2}:\d{2}/g)[1]

  return results
}
