const axios = require('axios')
const cheerio = require('cheerio')

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://mccchicago.org')
  const $ = cheerio.load(response.data)

  // match(/\d{1,2}:\d{1,2}/)[0] + ' PM',
  //   "juma1": "MCC-Elston: 1:05 PM-1:40"
  //   "juma1": " MEC: First: 1:05 PM-1:40 – Second: 2:05 PM-2:40"

  return [
    {
      name: 'Muslim Community Center',
      url: 'https://mccchicago.org',
      address: '4380 N. Elston Ave. Chicago, IL 60641, USA',
      placeId: 'ChIJ0Qry58jND4gR_kzSJ2jJU7c',
      timeZoneId: 'America/Chicago',
      uuid4: '64682fcc-46b2-4438-8a7c-381a23e5c1ef',
      crawlTime: date,
      geo: {
        latitude: 41.960308,
        longitude: -87.728960
      },
      fajrIqama: $('div.prar-timming > ul > li:nth-child(2) > div.pull-right > div.time-r').first().text(),
      zuhrIqama: $('div.prar-timming > ul > li:nth-child(3) > div.pull-right > div.time-r').first().text(),
      asrIqama: $('div.prar-timming > ul > li:nth-child(4) > div.pull-right > div.time-r').first().text(),
      maghribIqama: $('div.prar-timming > ul > li:nth-child(5) > div.pull-right > div.time-r').first().text(),
      ishaIqama: $('div.prar-timming > ul > li:nth-child(6) > div.pull-right > div.time-r').first().text(),
      juma1: $('body > div.elementor.elementor-7656 > div > div > section.elementor-element.elementor-element-d46fba2.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default.elementor-section.elementor-top-section > div > div > div.elementor-element.elementor-element-67c6f3d.elementor-column.elementor-col-33.elementor-top-column > div > div > div.elementor-element.elementor-element-6cd0d36.elementor-widget.elementor-widget-text-editor > div > div > p > span:nth-child(1)').text().match(/MCC-Elston: (\d{1,2}:\d{1,2})/)[1]
    },
    {
      name: 'Muslim Education Center',
      url: 'https://mccchicago.org',
      address: '8601 Menard Ave. Morton Grove, IL 60053, USA',
      placeId: 'ChIJBYEW9EnPD4gRgXSGmsX2mb4',
      timeZoneId: 'America/Chicago',
      uuid4: '4b7298fd-773a-40ec-b987-fb5056d68cd5',
      crawlTime: date,
      geo: {
        latitude: 42.037729,
        longitude: -87.771120
      },
      fajrIqama: $('div.prar-timming > ul > li:nth-child(2) > div.pull-right > div.time-l').first().text(),
      zuhrIqama: $('div.prar-timming > ul > li:nth-child(3) > div.pull-right > div.time-l').first().text(),
      asrIqama: $('div.prar-timming > ul > li:nth-child(4) > div.pull-right > div.time-l').first().text(),
      maghribIqama: $('div.prar-timming > ul > li:nth-child(5) > div.pull-right > div.time-l').first().text(),
      ishaIqama: $('div.prar-timming > ul > li:nth-child(6) > div.pull-right > div.time-l').first().text(),
      juma1: $('body > div.elementor.elementor-7656 > div > div > section.elementor-element.elementor-element-d46fba2.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default.elementor-section.elementor-top-section > div > div > div.elementor-element.elementor-element-67c6f3d.elementor-column.elementor-col-33.elementor-top-column > div > div > div.elementor-element.elementor-element-6cd0d36.elementor-widget.elementor-widget-text-editor > div > div > p > span:nth-child(3)').text().match(/MEC: First: (\d{1,2}:\d{1,2})/)[1],
      juma2: $('body > div.elementor.elementor-7656 > div > div > section.elementor-element.elementor-element-d46fba2.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default.elementor-section.elementor-top-section > div > div > div.elementor-element.elementor-element-67c6f3d.elementor-column.elementor-col-33.elementor-top-column > div > div > div.elementor-element.elementor-element-6cd0d36.elementor-widget.elementor-widget-text-editor > div > div > p > span:nth-child(3)').text().match(/Second: (\d{1,2}:\d{1,2})/)[1]
    },
    {
      name: "O'Hare Airport Terminal 2",
      url: 'https://mccchicago.org',
      address: "10000 W O'Hare Ave, Chicago, IL 60666, USA",
      placeId: 'ChIJ0XqtPia0D4gRGhSGFW4pHV0',
      timeZoneId: 'America/Chicago',
      uuid4: '7465437c-46cd-4e09-96f6-e3fac29ae780',
      crawlTime: date,
      geo: {
        latitude: 41.97651,
        longitude: -87.905013
      },
      juma1: $('body > div.elementor.elementor-7656 > div > div > section.elementor-element.elementor-element-d46fba2.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default.elementor-section.elementor-top-section > div > div > div.elementor-element.elementor-element-67c6f3d.elementor-column.elementor-col-33.elementor-top-column > div > div > div.elementor-element.elementor-element-6cd0d36.elementor-widget.elementor-widget-text-editor > div > div > p > span:nth-child(5)').text().match(/\d{1,2}:\d{1,2}/)[0]
    }
  ]
}
