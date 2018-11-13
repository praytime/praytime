exports.results = [
  {
    uuid4: 'f53572b2-8ac0-47b9-a010-f4cff10800da',
    name: 'Duncanville Islamic Center',
    url: 'http://www.dicenter.org/',
    timeZoneId: 'America/Chicago',
    address: '1419 Acton Ave, Duncanville, TX 75137, USA',
    geo: {
      latitude: 32.63412,
      longitude: -96.901117
    },
    placeId: 'ChIJhW1M6eyRToYRljThXe1ulDc',
    crawlTime: new Date()
  }
]

// // const axios = require('axios')
// // const cheerio = require('cheerio')

// // const results = [
// //   {
// //     uuid4: 'f53572b2-8ac0-47b9-a010-f4cff10800da',
// //     name: 'Duncanville Islamic Center',
// //     url: 'http://www.dicenter.org/',
// //     timeZoneId: 'America/Chicago',
// //     address: '1419 Acton Ave, Duncanville, TX 75137, USA',
// //     geo: {
// //       latitude: 32.63412,
// //       longitude: -96.901117
// //     },
// //     placeId: 'ChIJhW1M6eyRToYRljThXe1ulDc'
// //   }
// // ]

// // exports.run = async () => {
// //   const date = new Date()

// //   // get frame element
// //   let response = await axios.get('http://www.dicenter.org/')
// //   const $parent = cheerio.load(response.data)

// //   // get frame src url
// //   // const src = $parent('iframe').attr('src')
// //   const src = $parent('#comp-ikj21sz5iframe').attr('data-src')

// //   console.log(src)

// //   // load src url
// //   response = await axios.get(src)

// //   console.log(response.data)

// //   const $ = cheerio.load(response.data)

// //   console.log($('#theTable > tbody > tr:nth-child(1) > td:nth-child(2)'))

// //   results[0].crawlTime = date

// //   results[0].fajrIqama = $('#theTable > tbody > tr:nth-child(1) > td:nth-child(2)').text().trim()
// //   results[0].zuhrIqama = $('#theTable > tbody > tr:nth-child(2) > td:nth-child(2)').text().trim()
// //   results[0].asrIqama = $('#theTable > tbody > tr:nth-child(3) > td:nth-child(2)').text().trim()
// //   results[0].maghribIqama = $('#theTable > tbody > tr:nth-child(4) > td:nth-child(2)').text().trim()
// //   results[0].ishaIqama = $('#theTable > tbody > tr:nth-child(5) > td:nth-child(2)').text().trim()
// //   results[0].juma1 = $('#theTable > tbody > tr:nth-child(6) > td:nth-child(2)').text().match(/\d{1,2}:\d{2}/)[0]

// //   return results
// // }

// exports.apifySettings = {
//   startUrls: [ { 'value': 'http://www.dicenter.org/' } ],
//   pageFunction: function pageFunction (context) {
//     const date = new Date()
//     const $ = context.jQuery
//     const startedAt = Date.now()
//     let loaded = false

//     $('#comp-ikj21sz5iframe').load(function () {
//       loaded = true
//     })

//     const extractData = function () {
//       // timeout after 10 seconds
//       if ((Date.now() - startedAt) > 10000) {
//         context.finish('Timed out')
//         return
//       }

//       // if my element still hasn't been loaded, wait a little more
//       if (!loaded) {
//         setTimeout(extractData, 500)
//         return
//       }

//       // if my element still hasn't been loaded, wait a little more
//       if ($('#comp-ikj21sz5iframe').length === 0) {
//         setTimeout(extractData, 500)
//         return
//       }

//       const contents = $('#comp-ikj21sz5iframe').contents()

//       if (contents.find('#theTable > tbody > tr:nth-child(1) > td:nth-child(2)').length === 0) {
//         setTimeout(extractData, 500)
//         return
//       }

//       // refresh page screenshot and HTML for debugging
//       context.saveSnapshot()

//       // save a result
//       context.finish({
//         results: [
//           {
//             crawlTime: date,
//             uuid4: 'f53572b2-8ac0-47b9-a010-f4cff10800da',
//             name: 'Duncanville Islamic Center',
//             url: 'http://www.dicenter.org/',
//             timeZoneId: 'America/Chicago',
//             address: '1419 Acton Ave, Duncanville, TX 75137, USA',
//             geo: {
//               latitude: 32.63412,
//               longitude: -96.901117
//             },
//             placeId: 'ChIJhW1M6eyRToYRljThXe1ulDc',
//             fajrIqama: contents.find('#theTable > tbody > tr:nth-child(1) > td:nth-child(2)').text().trim(),
//             zuhrIqama: contents.find('#theTable > tbody > tr:nth-child(2) > td:nth-child(2)').text().trim(),
//             asrIqama: contents.find('#theTable > tbody > tr:nth-child(3) > td:nth-child(2)').text().trim(),
//             maghribIqama: contents.find('#theTable > tbody > tr:nth-child(4) > td:nth-child(2)').text().trim(),
//             ishaIqama: contents.find('#theTable > tbody > tr:nth-child(5) > td:nth-child(2)').text().trim(),
//             juma1: contents.find('#theTable > tbody > tr:nth-child(6) > td:nth-child(2)').text().trim()
//           }
//         ]
//       })
//     }.toString()
//   }
// }
