const util = require('../../../util')

const ids = [
  {
    uuid4: '39a90e54-4685-4b78-928a-a74db25e2f49',
    name: 'Crossroads Musalla Mosque مسجد مصلى Musallah',
    url: 'http://masjidmadeena.com/',
    timeZoneId: 'America/Los_Angeles',
    address: '827 164th Ave NE, Bellevue, WA 98008, USA',
    placeId: 'ChIJL-zpaLdtkFQRFoL7o_FZDZA',
    geo: {
      latitude: 47.61784129999999,
      longitude: -122.1221867
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  $('.azan-time-body tr:contains("Sunrise")').remove()
  $('.azan-time-body tr:contains("Hanafi")').remove()

  const a = util.mapToText($, '.azan-time-body td:last-child')
    .filter(util.matchTime)
    .map(util.extractTimeAmPm)

  util.setTimes(ids[0], a)

  return ids
}

exports.ids = ids
