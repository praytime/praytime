const path = require('path')
const fs = require('fs')

const masaajid = []

// Returns a list of all masjid crawlers
fs.readdirSync(__dirname, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .forEach(({ name: country }) => {
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
