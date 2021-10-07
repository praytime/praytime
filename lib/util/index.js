const axios = require('axios').default
const cheerio = require('cheerio')

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

// Takes cheerio $ and results of a $(...) selection and converts to a text array
exports.mapToText = ($, s) => $(s).map((_, v) => $(v).text().trim()).toArray()