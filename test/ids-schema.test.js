const test = require('node:test')
const assert = require('node:assert/strict')

const { masaajid } = require('../lib')

const uuidV4Rx = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const isValidTimeZoneId = (timeZoneId) => {
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: timeZoneId }).format(new Date())
    return true
  } catch {
    return false
  }
}

test('all crawler ids contain required fields and valid uuid4/timeZoneId/geo values', () => {
  const violations = []

  masaajid.forEach((crawlerPath) => {
    const crawler = require(crawlerPath)
    const ids = crawler.ids || []

    ids.forEach((record) => {
      const label = `${crawlerPath} (${record?.name || 'unknown'})`

      if (typeof record?.uuid4 !== 'string' || record.uuid4.length === 0) {
        violations.push(`${label}: missing uuid4`)
      } else if (!uuidV4Rx.test(record.uuid4)) {
        violations.push(`${label}: invalid uuid4 format (${record.uuid4})`)
      }

      if (typeof record?.name !== 'string' || record.name.trim().length === 0) {
        violations.push(`${label}: missing name`)
      }

      if (typeof record?.timeZoneId !== 'string' || record.timeZoneId.length === 0) {
        violations.push(`${label}: missing timeZoneId`)
      } else if (!isValidTimeZoneId(record.timeZoneId)) {
        violations.push(`${label}: invalid timeZoneId (${record.timeZoneId})`)
      }

      const latitude = record?.geo?.latitude
      const longitude = record?.geo?.longitude
      if (!Number.isFinite(latitude)) {
        violations.push(`${label}: geo.latitude is not a finite number (${latitude})`)
      } else if (latitude < -90 || latitude > 90) {
        violations.push(`${label}: geo.latitude out of range (${latitude})`)
      }
      if (!Number.isFinite(longitude)) {
        violations.push(`${label}: geo.longitude is not a finite number (${longitude})`)
      } else if (longitude < -180 || longitude > 180) {
        violations.push(`${label}: geo.longitude out of range (${longitude})`)
      }
    })
  })

  assert.equal(
    violations.length,
    0,
    `ids schema violations found:\n${violations.join('\n')}`
  )
})
