const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: 'e15b52ff-5df0-48f0-938c-65066c8d9b00',
    name: 'Masjid Al-Islam',
    url: 'http://masjidalislam.org',
    timeZoneId: 'America/Chicago',
    address: '2604 S Harwood St, Dallas, TX 75215, USA',
    geo: {
      latitude: 32.767267,
      longitude: -96.779057
    },
    placeId: 'ChIJy0rX1_CYToYRpBUJvsi-7fI'
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://masjidalislam.org/prayer-times/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $('#block_content_first > div > div > div.col-md-4.mbtm.fadeIn.begood_load.mbtm > div.vc_row.wpb_row.vc_row-fluid.vc_row-has-fill.vc_row-o-full-height.vc_row-o-columns-middle.vc_row-o-equal-height.vc_row-flex.vc_general.vc_parallax.vc_parallax-content-moving > div:nth-child(2) > div > div > div:nth-child(1) > div > h3 > strong').text().trim()
  results[0].zuhrIqama = $('#block_content_first > div > div > div.col-md-4.mbtm.fadeIn.begood_load.mbtm > div.vc_row.wpb_row.vc_row-fluid.vc_row-has-fill.vc_row-o-full-height.vc_row-o-columns-middle.vc_row-o-equal-height.vc_row-flex.vc_general.vc_parallax.vc_parallax-content-moving > div:nth-child(2) > div > div > div:nth-child(2) > div > h3 > strong').text().trim()
  results[0].asrIqama = $('#block_content_first > div > div > div.col-md-4.mbtm.fadeIn.begood_load.mbtm > div.vc_row.wpb_row.vc_row-fluid.vc_row-has-fill.vc_row-o-full-height.vc_row-o-columns-middle.vc_row-o-equal-height.vc_row-flex.vc_general.vc_parallax.vc_parallax-content-moving > div:nth-child(2) > div > div > div:nth-child(3) > div > h3 > strong').text().trim()
  results[0].maghribIqama = $('#block_content_first > div > div > div.col-md-4.mbtm.fadeIn.begood_load.mbtm > div.vc_row.wpb_row.vc_row-fluid.vc_row-has-fill.vc_row-o-full-height.vc_row-o-columns-middle.vc_row-o-equal-height.vc_row-flex.vc_general.vc_parallax.vc_parallax-content-moving > div:nth-child(2) > div > div > div:nth-child(4) > div > h3 > strong').text().trim()
  results[0].ishaIqama = $('#block_content_first > div > div > div.col-md-4.mbtm.fadeIn.begood_load.mbtm > div.vc_row.wpb_row.vc_row-fluid.vc_row-has-fill.vc_row-o-full-height.vc_row-o-columns-middle.vc_row-o-equal-height.vc_row-flex.vc_general.vc_parallax.vc_parallax-content-moving > div:nth-child(2) > div > div > div:nth-child(5) > div > h3 > strong').text().trim()
  results[0].juma1 = $('#block_content_first > div > div > div.col-md-4.mbtm.fadeIn.begood_load.mbtm > div.vc_row.wpb_row.vc_row-fluid.vc_row-has-fill.vc_row-o-full-height.vc_row-o-columns-middle.vc_row-o-equal-height.vc_row-flex.vc_general.vc_parallax.vc_parallax-content-moving > div:nth-child(2) > div > div > div:nth-child(6) > div > h3 > strong').text().trim()

  return results
}
