const axios = require('axios').default
const cheerio = require('cheerio')
const util = require('../../../util')

const ids = [
  {
    uuid4: '5e450aef-5957-461a-9fce-985b3bd54208',
    name: 'The Islamic Community Center of Illinois',
    url: 'https://iccicenter.org/',
    address: '6435 W Belmont Ave, Chicago, IL 60634, USA',
    timeZoneId: 'America/Chicago',
    placeId: 'ChIJh-pGXp3LD4gRMAa70sL98Cw',
    geo: {
      latitude: 41.938004,
      longitude: -87.787551
    }
  }
]

exports.run = async () => {
  const response = await axios.get('https://iccicenter.org/')
  const $ = cheerio.load(response.data)

  util.setIqamaTimes(ids[0], util.mapToText($, 'table.dptTimetable td.jamah'))

  ids[0].juma1 = 'check website'

  return ids
}
exports.ids = ids
