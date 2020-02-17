const axios = require('axios')
const cheerio = require('cheerio')

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://www.masjidtawheedchicago.org/')
  const $ = cheerio.load(response.data)

  return [
    {
      uuid4: 'a1811e40-3daf-442b-96ba-5408b889e436',
      crawlTime: date,
      name: 'Masjid Tawheed Chicago',
      url: 'http://www.masjidtawheedchicago.org/',
      address: '8726 S Halsted St, Chicago, IL 60620, USA',
      placeId: 'ChIJbf_cjYklDogRGwRx5bHzgRM',
      timeZoneId: 'America/Chicago',
      geo: {
        latitude: 41.735048,
        longitude: -87.643843
      },
      fajrIqama: $('body > center > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td:nth-child(3) > p:nth-child(1) > table > tbody > tr:nth-child(3) > td:nth-child(2) > span').text().trim(),
      zuhrIqama: $('body > center > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td:nth-child(3) > p:nth-child(1) > table > tbody > tr:nth-child(4) > td:nth-child(2) > span').text().trim(),
      asrIqama: $('body > center > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td:nth-child(3) > p:nth-child(1) > table > tbody > tr:nth-child(6) > td:nth-child(2) > span').text().trim(),
      maghribIqama: $('body > center > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td:nth-child(3) > p:nth-child(1) > table > tbody > tr:nth-child(7) > td:nth-child(2) > span').text().trim(),
      ishaIqama: $('body > center > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td:nth-child(3) > p:nth-child(1) > table > tbody > tr:nth-child(8) > td:nth-child(2) > span').text().trim(),
      juma1: $('body > center > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td:nth-child(3) > p:nth-child(1) > table > tbody > tr:nth-child(5) > td:nth-child(2) > span').text().trim()
    }
  ]
}
