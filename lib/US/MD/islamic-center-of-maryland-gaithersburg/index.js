const util = require('../../../util')

const ids = [
  {
    uuid4: '1e8965a1-0922-44fc-8d26-e186cada1e0b',
    name: 'Islamic Center of Maryland',
    url: 'http://www.icomd.org/',
    timeZoneId: 'America/New_York',
    address: '19411 Woodfield Rd, Gaithersburg, MD 20879, USA',
    placeId: 'ChIJyy3PmHfTt4kR1xQsf_drUQ8',
    geo: {
      latitude: 39.174688,
      longitude: -77.150639
    }
  }, {
    uuid4: '9802ce2e-582c-4072-b2d4-f587885fe84e',
    name: 'Islamic Center of Maryland Juma: Casey Community Center',
    url: 'http://www.icomd.org/',
    timeZoneId: 'America/New_York',
    address: '810 S Frederick Ave, Gaithersburg, MD 20877, USA',
    placeId: 'ChIJ2ySCNLjSt4kRlIPMuVVjvlI',
    geo: {
      latitude: 39.12402899999999,
      longitude: -77.181646
    }
  }, {
    uuid4: '5feaf2da-0d64-4f83-a24c-981759497152',
    name: 'Islamic Center of Maryland Juma: Rollins Congressional Club',
    url: 'http://www.icomd.org/',
    timeZoneId: 'America/New_York',
    address: '1621 Martha Terrace, Rockville, MD 20852, USA',
    placeId: 'ChIJN2E050zMt4kRi0PnfIgqNO8',
    geo: {
      latitude: 39.0592651,
      longitude: -77.13356780000001
    }
  }
]

exports.run = async () => {
  const $ = await util.load(ids[0].url)

  const a = util.mapToText($, '.prayertime td:last-child')
  a.splice(1, 1) // remove sunrise

  util.setIqamaTimes(ids[0], a)

  util.setJumaTimes(ids[0], util.mapToText($, '.jumuatime td:contains("ICM") + td'))
  util.setJumaTimes(ids[1], util.mapToText($, '.jumuatime td:contains("Casey") + td'))
  util.setJumaTimes(ids[2], util.mapToText($, '.jumuatime td:contains("Rollins") + td'))

  return ids
}

exports.ids = ids
