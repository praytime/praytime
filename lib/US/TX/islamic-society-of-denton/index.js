const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: '63650e20-2160-4d78-8239-925cc6a52fd4',
    name: 'Islamic Society of Denton',
    url: 'https://www.dentonmosque.com/',
    timeZoneId: 'America/Chicago',
    address: '1105 Greenlee St, Denton, TX 76201, USA',
    geo: {
      latitude: 33.201719,
      longitude: -97.144861
    },
    placeId: 'ChIJ2epN7FrKTYYRScFfZMeKW4o'
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://www.dentonmosque.com/')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $('#page-348 > div > div > div > div > section > div > div > div > div > div > section > div > div > div.elementor-element.elementor-element-f155c51.elementor-column.elementor-col-50.elementor-inner-column > div > div > div.elementor-element.elementor-element-eec9875.elementor-widget.elementor-widget-shortcode > div > table > tbody > tr:nth-child(3) > td:nth-child(3)').text().trim()
  results[0].zuhrIqama = $('#page-348 > div > div > div > div > section > div > div > div > div > div > section > div > div > div.elementor-element.elementor-element-f155c51.elementor-column.elementor-col-50.elementor-inner-column > div > div > div.elementor-element.elementor-element-eec9875.elementor-widget.elementor-widget-shortcode > div > table > tbody > tr:nth-child(5) > td:nth-child(3)').text().trim()
  results[0].asrIqama = $('#page-348 > div > div > div > div > section > div > div > div > div > div > section > div > div > div.elementor-element.elementor-element-f155c51.elementor-column.elementor-col-50.elementor-inner-column > div > div > div.elementor-element.elementor-element-eec9875.elementor-widget.elementor-widget-shortcode > div > table > tbody > tr:nth-child(6) > td:nth-child(3)').text().trim()
  results[0].maghribIqama = $('#page-348 > div > div > div > div > section > div > div > div > div > div > section > div > div > div.elementor-element.elementor-element-f155c51.elementor-column.elementor-col-50.elementor-inner-column > div > div > div.elementor-element.elementor-element-eec9875.elementor-widget.elementor-widget-shortcode > div > table > tbody > tr:nth-child(7) > td:nth-child(3)').text().trim()
  results[0].ishaIqama = $('#page-348 > div > div > div > div > section > div > div > div > div > div > section > div > div > div.elementor-element.elementor-element-f155c51.elementor-column.elementor-col-50.elementor-inner-column > div > div > div.elementor-element.elementor-element-eec9875.elementor-widget.elementor-widget-shortcode > div > table > tbody > tr:nth-child(8) > td:nth-child(3)').text().trim()
  results[0].juma1 = $('#page-348 > div > div > div > div > section > div > div > div > div > div > section > div > div > div.elementor-element.elementor-element-f155c51.elementor-column.elementor-col-50.elementor-inner-column > div > div > div.elementor-element.elementor-element-eec9875.elementor-widget.elementor-widget-shortcode > div > table > tbody > tr:nth-child(9)').text().match(/\d{1,2}:\d{2}/)[0]

  return results
}
