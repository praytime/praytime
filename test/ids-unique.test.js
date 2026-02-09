const test = require('node:test')
const assert = require('node:assert/strict')

const { masaajid } = require('../lib')

test('all crawler ids use unique uuid4 values', () => {
  const seen = new Map()

  masaajid.forEach((crawlerPath) => {
    const crawler = require(crawlerPath)
    const ids = crawler.ids || []

    ids.forEach((record) => {
      const uuid = record?.uuid4
      assert.equal(typeof uuid, 'string', `missing uuid4 in ${crawlerPath} (${record?.name || 'unknown'})`)
      assert.ok(uuid.length > 0, `empty uuid4 in ${crawlerPath} (${record?.name || 'unknown'})`)

      if (!seen.has(uuid)) {
        seen.set(uuid, [])
      }
      seen.get(uuid).push(`${crawlerPath} -> ${record?.name || 'unknown'}`)
    })
  })

  const duplicates = [...seen.entries()].filter(([, refs]) => refs.length > 1)
  assert.equal(
    duplicates.length,
    0,
    `duplicate uuid4 values found:\n${duplicates
      .map(([uuid, refs]) => `${uuid}\n  ${refs.join('\n  ')}`)
      .join('\n')}`
  )
})
