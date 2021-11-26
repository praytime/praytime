const axios = require('axios').default
const cheerio = require('cheerio')
const tz = require('timezone')
const us = tz(require('timezone/America'))

exports.loadJson = async (url) => {
  const response = await axios.get(url)
  return response.data
}

exports.load = async (url) => {
  const response = await axios.get(url)
  return cheerio.load(response.data)
}

exports.setIqamaTimes = (p, a) => {
  p.fajrIqama = a[0]
  p.zuhrIqama = a[1]
  p.asrIqama = a[2]
  p.maghribIqama = a[3]
  p.ishaIqama = a[4]
}

exports.setJumaTimes = (p, a) => {
  switch ((a.length > 3 ? 3 : a.length)) {
    case 3:
      p.juma3 = a[2]
      // fallthrough
    case 2:
      p.juma2 = a[1]
      // fallthrough
    case 1:
      p.juma1 = a[0]
  }
}

exports.setTimes = (p, a) => {
  exports.setIqamaTimes(p, a)
  exports.setJumaTimes(p, a.slice(5))
}

const timeAmPmRx = /\d{1,2}\s*:\s*\d{1,2}\s*[ap]\.?m\.?/i
const timeAmPmRxG = /\d{1,2}\s*:\s*\d{1,2}\s*[ap]\.?m\.?/gi
exports.timeAmPmRx = timeAmPmRx
exports.timeAmPmRxG = timeAmPmRxG
exports.matchTimeAmPm = (t) => t.match(timeAmPmRx)
// Returns text matching timeAmPmRx or empty string
exports.extractTimeAmPm = (t) => {
  const a = t.match(timeAmPmRx)
  if (a?.length) {
    return a[0]
  } else {
    return ''
  }
}
exports.matchTimeAmPmG = (t) => t.match(timeAmPmRxG)

// Takes cheerio $ and results of a $(...) selection and converts to a text array
// $ is a cheerio object
// s is the selector
// r is the root element (optional)
exports.mapToText = ($, s, r) => $(s, r).map((_, v) => $(v).text().trim()).toArray()

// returns a promise that waits until frame with matching url is navigated, or times out
exports.waitForFrame = (page, urlFragment, timeoutMs = 10000) => {
  let timeoutId
  const timeoutPromise = new Promise((resolve, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error('timed out'))
    }, timeoutMs)
  })

  const framePromise = new Promise((resolve, reject) => {
    page.on('framenavigated', (frame) => {
      if (frame.url().includes(urlFragment)) {
        clearTimeout(timeoutId)
        resolve(frame)
      }
    })
  })
  return Promise.race([framePromise, timeoutPromise])
}

// Use destructuring assignment to extract timezone
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
exports.strftime = (fmt, { timeZoneId: tz }) => us(Date.now(), tz, fmt)

exports.isJumaToday = ({ timeZoneId: tz }) => {
  // %u: the weekday, Monday as the first day of the week (1-7)
  const day = us(Date.now(), tz, '%u')
  return (day === '5')
}
