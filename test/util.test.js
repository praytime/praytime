const test = require('node:test')
const assert = require('node:assert/strict')
const util = require('../lib/util')

test('hourMinuteAmPmToMinutes handles noon and midnight correctly', () => {
  assert.equal(util.hourMinuteAmPmToMinutes('12:00 AM'), 0)
  assert.equal(util.hourMinuteAmPmToMinutes('12:00 PM'), 720)
  assert.equal(util.hourMinuteAmPmToMinutes('1:00 PM'), 780)
  assert.equal(util.hourMinuteAmPmToMinutes('11:59 PM'), 1439)
})

test('hourMinuteAmPmToMinutes supports compact and lowercase inputs', () => {
  assert.equal(util.hourMinuteAmPmToMinutes('6:03AM'), 363)
  assert.equal(util.hourMinuteAmPmToMinutes('6:03am'), 363)
  assert.equal(util.hourMinuteAmPmToMinutes(' 6 : 03 p.m. '), 1083)
})

test('hourMinuteAmPmToMinutes rejects invalid inputs', () => {
  assert.throws(() => util.hourMinuteAmPmToMinutes('sunset'), /invalid time format/)
  assert.throws(() => util.hourMinuteAmPmToMinutes('13:00 PM'), /invalid time value/)
  assert.throws(() => util.hourMinuteAmPmToMinutes('0:00 AM'), /invalid time value/)
})

test('minutesTohourMinute normalizes day boundaries', () => {
  assert.equal(util.minutesTohourMinute(0), '0:00')
  assert.equal(util.minutesTohourMinute(1439), '23:59')
  assert.equal(util.minutesTohourMinute(1440), '0:00')
  assert.equal(util.minutesTohourMinute(-1), '23:59')
})

test('minuteOffsetFromText handles optional spaces and signs', () => {
  assert.equal(util.minuteOffsetFromText('+10'), 10)
  assert.equal(util.minuteOffsetFromText('+ 10'), 10)
  assert.equal(util.minuteOffsetFromText('  - 7  '), -7)
  assert.throws(() => util.minuteOffsetFromText('sunset'), /invalid minute offset/)
})
