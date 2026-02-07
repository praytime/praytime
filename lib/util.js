const axios = require('axios').default
const cheerio = require('cheerio')
const tz = require('timezone')
const us = tz(require('timezone/America'))

const parsePositiveInt = (value, fallback) => {
  const n = Number(value)
  return Number.isFinite(n) && n > 0 ? n : fallback
}
exports.parsePositiveInt = parsePositiveInt

const DEFAULT_HTTP_TIMEOUT_MS = parsePositiveInt(process.env.HTTP_TIMEOUT_MS, 20000)
const DEFAULT_HTTP_RETRIES = parsePositiveInt(process.env.HTTP_RETRIES, 2)
const RETRYABLE_STATUS_CODES = new Set([408, 425, 429, 500, 502, 503, 504])
const RETRYABLE_ERROR_CODES = new Set(['ECONNABORTED', 'ETIMEDOUT', 'ECONNRESET', 'EAI_AGAIN'])

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const getWithRetry = async (url, axiosOpts) => {
  const attempts = DEFAULT_HTTP_RETRIES + 1
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      return await axios.get(url, {
        timeout: DEFAULT_HTTP_TIMEOUT_MS,
        ...axiosOpts
      })
    } catch (err) {
      const status = err?.response?.status
      const code = err?.code
      const retryable = !err?.response ||
        RETRYABLE_STATUS_CODES.has(status) ||
        RETRYABLE_ERROR_CODES.has(code)
      if (!retryable || attempt === (attempts - 1)) {
        throw err
      }
      await sleep(Math.min(3000, 500 * (2 ** attempt)))
    }
  }
}

exports.loadJson = async (url, opts) => {
  const response = await getWithRetry(url, opts?.axios)
  return response.data
}

exports.load = async (url, opts) => {
  const response = await getWithRetry(url, opts?.axios)
  return cheerio.load(response.data, opts?.cheerio)
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
      if (a[2]) {
        p.juma3 = a[2]
      }
      // fallthrough
    case 2:
      if (a[1]) {
        p.juma2 = a[1]
      }
      // fallthrough
    case 1:
      if (a[0]) {
        p.juma1 = a[0]
      }
  }
}

exports.setTimes = (p, a) => {
  exports.setIqamaTimes(p, a)
  exports.setJumaTimes(p, a.slice(5))
}

exports.setIqamaTimesAll = (pa, a) => {
  pa.forEach((p) => {
    exports.setIqamaTimes(p, a)
  })
}

exports.setJumaTimesAll = (pa, a) => {
  pa.forEach((p) => {
    exports.setJumaTimes(p, a)
  })
}

exports.setTimesAll = (pa, a) => {
  pa.forEach((p) => {
    exports.setTimes(p, a)
  })
}

const timeRx = /\d{1,2}\s*:\s*\d{1,2}/
const timeRxG = /\d{1,2}\s*:\s*\d{1,2}/g
exports.timeRx = timeRx
exports.timeRxG = timeRxG
exports.matchTime = (t) => t.match(timeRx)
// Returns text matching timeRx or empty string
exports.extractTime = (t) => {
  const a = t.match(timeRx)
  if (a?.length) {
    return a[0]
  } else {
    return ''
  }
}
exports.matchTimeG = (t) => t.match(timeRxG)

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

// hour:minute meridiem to minutes from midnight
exports.hourMinuteAmPmToMinutes = (hm) => {
  const match = hm?.match(/(\d{1,2})\s*:\s*(\d{1,2})\s*([ap]\.?m\.?)/i)
  if (!match) {
    throw new Error(`invalid time format: ${hm}`)
  }
  let [h, m, ampm] = match.slice(1)
  h = parseInt(h, 10)
  m = parseInt(m, 10)
  ampm = ampm.toLowerCase()
  if (h < 1 || h > 12 || m < 0 || m > 59) {
    throw new Error(`invalid time value: ${hm}`)
  }
  if (h === 12) {
    h = 0
  }
  if (ampm.startsWith('p')) {
    h += 12
  }
  // console.error(`${hm} -> ${((h * 60) + m)}`)
  return ((h * 60) + m)
}

// Converts minutes from midnight to hour:minute (24hr format)
exports.minutesTohourMinute = (minuteStr) => {
  const minuteInt = Number(minuteStr)
  if (!Number.isFinite(minuteInt)) {
    throw new Error(`invalid minute value: ${minuteStr}`)
  }
  const dayMinutes = 24 * 60
  const normalized = ((Math.trunc(minuteInt) % dayMinutes) + dayMinutes) % dayMinutes
  const h = Math.floor(normalized / 60)
  const m = String(normalized % 60).padStart(2, '0')
  // console.error(`${m} -> ${h}:${m}`)
  return `${h}:${m}`
}

exports.minuteOffsetFromText = (t) => {
  const match = t?.match(/([+-])\s*(\d+)/)
  if (!match) {
    throw new Error(`invalid minute offset: ${t}`)
  }
  const minutes = parseInt(match[2], 10)
  return match[1] === '-' ? -minutes : minutes
}

// Takes cheerio $ and results of a $(...) selection and converts to a text array
// $ is a cheerio object
// s is the selector
// r is the root element (optional)
exports.mapToText = ($, s, r) => $(s, r).map((_, v) => $(v).text().trim()).toArray()

// Cheerio .text() doesn't preserve line breaks (<br>), workaround
// to replace <br> with \n
exports.mapToTextPreserveBreaks = ($, s, r) => {
  // https://github.com/cheeriojs/cheerio/issues/839#issuecomment-379737480
  $(s, r).find('br').replaceWith('\n')
  return $(s, r).map((_, v) => $(v).text().trim()).toArray()
}

// Just converts cheerio result to a string
exports.toText = ($, s, r) => $(s, r).text().trim()

// Takes puppeteer page/frame and selector and converts to a text array
exports.pptMapToText = (p, s) => p.$$eval(s, es => es.map(e => e.textContent.trim()))

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

// Given puppeteer page, dumps frame tree to console.error
exports.dumpFrameTree = (page) => {
  function dumpFrameTree (frame, indent) {
    console.error(`${indent}name: ${frame.name()} url: ${frame.url()}`)
    for (const child of frame.childFrames()) {
      dumpFrameTree(child, indent + '  ')
    }
  }
  dumpFrameTree(page.mainFrame(), '')
}

// Use destructuring assignment to extract timezone
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
exports.strftime = (fmt, { timeZoneId: tz }) => us(Date.now(), tz, fmt)

exports.isJumaToday = ({ timeZoneId: tz }) => {
  // %u: the weekday, Monday as the first day of the week (1-7)
  const day = us(Date.now(), tz, '%u')
  return (day === '5')
}

// Fisher-Yates algorithm
// https://stackoverflow.com/a/49555388/8370398
exports.shuffle = (a) => {
  let i = a.length
  while (i) {
    const j = Math.floor(Math.random() * i--);
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
