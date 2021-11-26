
const util = require('../../../util')

const ids = [
  {
    uuid4: 'f0a43d83-c05f-4665-a311-b4d0d9afbfc6',
    name: 'Masjid Fresno مسجد Islamic Center',
    url: 'http://www.masjidfresno.org/',
    timeZoneId: 'America/Los_Angeles',
    address: '2111 E Shaw Ave, Fresno, CA 93710, USA',
    placeId: 'ChIJx85SUQZdlIARdeRWM6bepZU',
    geo: {
      latitude: 36.8082955,
      longitude: -119.7517433
    }
  }
]

exports.run = async () => {
  const $ = await util.load('https://www-masjidfresno-org.filesusr.com/html/198b71_0719b50a4ad131b4aa29927ef6660d8e.html')

  const a = util.mapToText($, 'tr:contains("Iqama Time") ~ tr')
    .slice(1)
    .map(util.extractTimeAmPm)

  util.setTimes(ids[0], a)

  return ids
}

exports.ids = ids
