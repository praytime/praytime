const axios = require('axios')
const cheerio = require('cheerio')

exports.run = async () => {
  const date = new Date()
  const response = await axios.get('http://www.cimic.org')
  const $ = cheerio.load(response.data)

  return [
    {
      uuid4: 'aa3e7e64-947c-4943-b4fc-6e5bf39b50fb',
      crawlTime: date,
      name: 'Central Illinois Mosque and Islamic Center',
      url: 'http://www.cimic.org',
      address: '106 S Lincoln Ave, Urbana, IL 61801, USA',
      placeId: 'ChIJZxhDOm3XDIgRwO5K4Cbi840',
      timeZoneId: 'America/Chicago',
      geo: {
        latitude: 40.111639,
        longitude: -88.218979
      },
      fajrIqama: $('#text-21 > div > table > tbody > tr:nth-child(3) > td:nth-child(2)').text().trim(),
      zuhrIqama: $('#text-21 > div > table > tbody > tr:nth-child(3) > td:nth-child(3)').text().trim(),
      asrIqama: $('#text-21 > div > table > tbody > tr:nth-child(3) > td:nth-child(4)').text().trim(),
      maghribIqama: $('#text-21 > div > table > tbody > tr:nth-child(3) > td:nth-child(5)').text().trim(),
      ishaIqama: $('#text-21 > div > table > tbody > tr:nth-child(3) > td:nth-child(6)').text().trim(),
      juma1: $('#text-21 > div > center > small').text().match(/Jumuah: (\d{1,2}:\d{1,2})/)[1],
      juma2: $('#text-21 > div > center > small').text().match(/Jumuah: \d{1,2}:\d{1,2}.*(\d{1,2}:\d{1,2})/)[1]
    }
  ]
}
