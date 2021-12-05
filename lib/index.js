const path = require('path')
const fs = require('fs')

const masaajid = []

const countries = ['CA', 'US']
countries.forEach(country => {
  const countryDir = path.resolve(__dirname, country)
  fs.readdirSync(countryDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .forEach(({ name: state }) => {
      const stateDir = path.resolve(countryDir, state)
      fs.readdirSync(stateDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .forEach(({ name: crawler }) => {
          const crawlerDir = path.resolve(stateDir, crawler)
          masaajid.push(crawlerDir)
        })
    })
})

exports.masaajid = masaajid
