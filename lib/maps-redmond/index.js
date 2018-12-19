const axios = require('axios')
const cheerio = require('cheerio')

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('https://www.mapsredmond.org/')
  const $ = cheerio.load(response.data)

  return [
    {
      uuid4: '5be0348d-06cc-49b1-923f-c8acdef8e27e',
      crawlTime: date,
      name: 'Muslim Association of Puget Sound',
      url: 'https://www.mapsredmond.org/',
      address: '17550 NE 67th Ct, Redmond, WA 98052, USA',
      placeId: 'ChIJ2dRVrb1ykFQR4Jt-FGpMGLA',
      timeZoneId: 'America/Los_Angeles',
      geo: {
        latitude: 47.665648,
        longitude: -122.106557
      },
      fajrIqama: $('body > div.wrapper > div > div > div > div.full_width > div > div:nth-child(2) > div > div > div.center.wpb_column.vc_column_container.vc_col-sm-3 > div > div > div.wpb_text_column.wpb_content_element.vc_custom_1545162775865 > div > table > tbody > tr:nth-child(3) > td.jamah').text().trim(),
      zuhrIqama: $('body > div.wrapper > div > div > div > div.full_width > div > div:nth-child(2) > div > div > div.center.wpb_column.vc_column_container.vc_col-sm-3 > div > div > div.wpb_text_column.wpb_content_element.vc_custom_1545162775865 > div > table > tbody > tr:nth-child(5) > td.jamah').text().trim(),
      asrIqama: $('body > div.wrapper > div > div > div > div.full_width > div > div:nth-child(2) > div > div > div.center.wpb_column.vc_column_container.vc_col-sm-3 > div > div > div.wpb_text_column.wpb_content_element.vc_custom_1545162775865 > div > table > tbody > tr:nth-child(6) > td.jamah').text().trim(),
      maghribIqama: $('body > div.wrapper > div > div > div > div.full_width > div > div:nth-child(2) > div > div > div.center.wpb_column.vc_column_container.vc_col-sm-3 > div > div > div.wpb_text_column.wpb_content_element.vc_custom_1545162775865 > div > table > tbody > tr:nth-child(7) > td.jamah').text().trim(),
      ishaIqama: $('body > div.wrapper > div > div > div > div.full_width > div > div:nth-child(2) > div > div > div.center.wpb_column.vc_column_container.vc_col-sm-3 > div > div > div.wpb_text_column.wpb_content_element.vc_custom_1545162775865 > div > table > tbody > tr:nth-child(8) > td.jamah').text().trim(),
      juma1: $('body > div.wrapper > div > div > div > div.full_width > div > div:nth-child(2) > div > div > div.center.wpb_column.vc_column_container.vc_col-sm-3 > div > div > div.wpb_text_column.wpb_content_element.vc_custom_1545162775865 > div > p:nth-child(4) > span:nth-child(4)').text().trim()
    }
  ]
}
