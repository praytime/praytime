const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: 'f8363d70-cdd3-47a8-b95a-c5b0ee91f53e',
    name: 'Makkah Masjid (Garland Mosque)',
    url: 'http://www.makkahmasjid.net',
    timeZoneId: 'America/Chicago',
    address: '3301 W Buckingham Rd, Garland, TX 75042, USA',
    geo: {
      latitude: 32.931815,
      longitude: -96.679309
    },
    placeId: 'ChIJcTPQKG8eTIYRMds5yfnGyBA'
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://www.makkahmasjid.net')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  // having multiple elements w/same id is invalid. So instead of
  // #pt have to use div[id=pt] to match all the elements, then
  // use jQuery eq to select the right one.
  results[0].fajrIqama = $('#ctl00__PrayerTimetable1_lblFajrStart').text().trim()
  results[0].zuhrIqama = $('#ctl00__PrayerTimetable1_lblZuhrStart').text().trim()
  results[0].asrIqama = $('#ctl00__PrayerTimetable1_lblAsrStart').text().trim()
  results[0].maghribIqama = $('#ctl00__PrayerTimetable1_lblMaghribStart').text().trim()
  results[0].ishaIqama = $('span[id=ctl00__PrayerTimetable1_lblIshaStart]').eq(0).text().trim()
  results[0].juma1 = $('span[id=ctl00__PrayerTimetable1_lblIshaStart]').eq(1).text().trim()

  return results
}
