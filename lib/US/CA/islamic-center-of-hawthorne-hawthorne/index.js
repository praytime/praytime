
const util = require('../../../util')

const ids = [
  {
    uuid4: 'afae23dc-56dc-4ed7-9393-f782c7e13d6b',
    name: 'Islamic Center of Hawthorne',
    url: 'https://www.ichla.online/',
    timeZoneId: 'America/Los_Angeles',
    address: '12209 Hawthorne Way, Hawthorne, CA 90250, USA',
    placeId: 'ChIJL1hpkYO2woARA9PulLUU09g',
    geo: {
      latitude: 33.92168049999999,
      longitude: -118.353775
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.jamah')
  const j = util.mapToText($, 'h6:contains("Khutbah")')
    .shift()
    .match(util.timeAmPmRxG)

  util.setIqamaTimes(ids[0], a)
  util.setJumaTimes(ids[0], j)

  return ids
}

exports.ids = ids
