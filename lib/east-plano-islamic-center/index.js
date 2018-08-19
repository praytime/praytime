const axios = require('axios')
const cheerio = require('cheerio')

const results = [
  {
    uuid4: 'c7f52457-b461-44de-9f37-4f3b43aecaf6',
    name: 'East Plano Islamic Center',
    url: 'http://epicmasjid.net',
    address: '1350 Star Ct, Plano, TX 75074, USA',
    placeId: 'ChIJvdyH6-sbTIYREMaa7JQJCsc',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 33.01005,
      longitude: -96.646647
    }
  }
]

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://epicmasjid.net')
  const $ = cheerio.load(response.data)

  results[0].crawlTime = date

  results[0].fajrIqama = $('#tm-content > article > div > div > div.home_prayer_time.desktop_height > div > div.col.span_12.dark > div > div > div:nth-child(2) > p:nth-child(3)').text().trim()
  results[0].zuhrIqama = $('#tm-content > article > div > div > div.home_prayer_time.desktop_height > div > div.col.span_12.dark > div > div > div.second_section > p:nth-child(3)').text().trim()
  results[0].asrIqama = $('#tm-content > article > div > div > div.home_prayer_time.desktop_height > div > div.col.span_12.dark > div > div > div.third_section > p:nth-child(3)').text().trim()
  results[0].maghribIqama = $('#tm-content > article > div > div > div.home_prayer_time.desktop_height > div > div.col.span_12.dark > div > div > div.fourth_section > p:nth-child(3)').text().trim()
  results[0].ishaIqama = $('#tm-content > article > div > div > div.home_prayer_time.desktop_height > div > div.col.span_12.dark > div > div > div.five_section > p:nth-child(3)').text().trim()
  results[0].juma1 = $('#tm-content > article > div > div > div.home_prayer_time.desktop_height > div > div.col.span_12.dark > div > div > div:nth-child(8) > p:nth-child(2)').text().trim()
  results[0].juma2 = $('#tm-content > article > div > div > div.home_prayer_time.desktop_height > div > div.col.span_12.dark > div > div > div:nth-child(9) > p:nth-child(2)').text().trim()

  return results
}
