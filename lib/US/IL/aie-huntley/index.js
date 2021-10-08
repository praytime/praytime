const axios = require('axios')
const cheerio = require('cheerio')

const ids = [
  {
    uuid4: '3d9ab26e-bdd1-409d-9cdb-2449aa0cba7f',
    name: 'Academy of Islamic Education',
    url: 'https://www.aiehuntley.com/',
    address: '37W437 Huntley Rd, Dundee Township, IL 60118, USA',
    placeId: 'ChIJ01CaFpMRD4gRwo7w36W8taQ',
    timeZoneId: 'America/Chicago',
    geo: {
      latitude: 42.132128,
      longitude: -88.344777
    }
  }
]

exports.run = async () => {
  const [salahResp, jumuaResp] = await Promise.all([
    axios.get('https://masjidal.com/api/v1/time?masjid_id=0kAkaKqD'),
    axios.get('http://masjidal.com/aie/')
  ])

  const data = salahResp.data
  if (data.status === 'success') {
    ids[0].fajrIqama = data.data.iqama.fajr
    ids[0].zuhrIqama = data.data.iqama.zuhr
    ids[0].asrIqama = data.data.iqama.asr
    ids[0].maghribIqama = data.data.iqama.maghrib
    ids[0].ishaIqama = data.data.iqama.isha
  }

  const $ = cheerio.load(jumuaResp.data)
  ids[0].juma1 = $('#jummah1 > td.salah').text().trim()

  return ids
}
