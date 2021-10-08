const axios = require('axios').default
const cheerio = require('cheerio')
const util = require('../../../util')

const ids = [
  {
    uuid4: 'aa3e7e64-947c-4943-b4fc-6e5bf39b50fb',
    name: 'Central Illinois Mosque and Islamic Center',
    url: 'http://www.cimic.org',
    address: '106 S Lincoln Ave, Urbana, IL 61801, USA',
    placeId: 'ChIJZxhDOm3XDIgRwO5K4Cbi840',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 40.111639,
      longitude: -88.218979
    }
  }
]

exports.run = async () => {
  const response = await axios.get('https://us.mohid.co/il/school/cimic/masjid/widget/api/index/?m=prayertimings')
  const $ = cheerio.load(response.data)

  const d = $('div#daily > div.list').eq(-1).find('div.prayer_iqama_div')
  const j = $('div#jummah div.prayer_iqama_div')

  util.setIqamaTimes(ids[0], [
    d.eq(0).text().trim(),
    d.eq(1).text().trim(),
    d.eq(2).text().trim(),
    d.eq(3).text().trim(),
    d.eq(4).text().trim()
  ])

  ids[0].juma1 = j.eq(0).text().trim()
  ids[0].juma2 = j.eq(1).text().trim()

  return ids
}
