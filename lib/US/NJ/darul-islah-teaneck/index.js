
const util = require('../../../util')

const ids = [
  {
    uuid4: 'add881e6-e2f9-45f6-949b-0284e35d58c5',
    name: 'Darul Islah',
    url: 'http://www.darulislah.org/',
    timeZoneId: 'America/New_York',
    address: '320 Fabry Terrace, Teaneck, NJ 07666, USA',
    placeId: 'ChIJwyoBEDT3wokReMGrShy9IsE',
    geo: {
      latitude: 40.87159,
      longitude: -74.001451
    }
  }
]

exports.run = async () => {
  const $ = await util.load('http://darulislah.org/du/prayer_times_new.php')

  const a = util.mapToText($, 'td:last-child')
    .filter(t => t.match(/\d+\s*:\s*\d+/))

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], ['check website'])

  return ids
}

exports.ids = ids
