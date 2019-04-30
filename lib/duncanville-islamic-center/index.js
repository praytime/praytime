exports.apifySettings = {
  startUrls: [ { 'value': 'http://www.dicenter.org/' } ],
  disableWebSecurity: true, // for diff origin iframe access
  pageFunction: function pageFunction (context) {
    const date = new Date()
    const results = [
      {
        crawlTime: date,
        uuid4: 'f53572b2-8ac0-47b9-a010-f4cff10800da',
        name: 'Duncanville Islamic Center',
        url: 'http://www.dicenter.org/',
        timeZoneId: 'America/Chicago',
        address: '1419 Acton Ave, Duncanville, TX 75137, USA',
        geo: {
          latitude: 32.63412,
          longitude: -96.901117
        },
        placeId: 'ChIJhW1M6eyRToYRljThXe1ulDc'
      }
    ]

    if (context.request.userData && context.request.userData.label === 'iframeContent') {
      console.log('starting phase 2')
      // scrape iframe content there and return data
      const startedAt = Date.now()
      const extractData = function () {
        // timeout after 15 seconds
        if ((Date.now() - startedAt) > 15000) {
          console.log('phase 2 timeout')
          context.finish('timed out')
          return
        }

        // if my element still hasn't been loaded, wait a little more
        if (document.querySelector('#theTable > tbody > tr:nth-child(1) > td:nth-child(2)') == null) {
          setTimeout(extractData, 500)
          return
        }

        // save a result
        context.finish({ results: results })
      }
      context.willFinishLater()
      extractData()
    } else {
      console.log('starting phase 1')
      const startedAt = Date.now()
      const extractData = function () {
        if ((Date.now() - startedAt) > 5000) {
          console.log('phase 1 timeout')
          context.finish('timed out')
          return
        }

        if (!(document.querySelector('#comp-ikj21sz5iframe').src)) {
          console.log('waiting for src element')
          // console.log('data-src: ', document.querySelector('#comp-ikj21sz5iframe')['data-src'])
          Object.keys(document.querySelector('#comp-ikj21sz5iframe')).forEach(function (k) {
            console.log('[' + k + ']: ' + document.querySelector('#comp-ikj21sz5iframe')[k])
          })
          setTimeout(extractData, 500)
          return
        }

        console.log('src: ', document.querySelector('#comp-ikj21sz5iframe').src)

        context.enqueuePage({ url: document.querySelector('#comp-ikj21sz5iframe').src, userData: { label: 'iframeContent' } })
        context.skipOutput()
      }
      context.willFinishLater()
      extractData()
    }
  }.toString()
}
