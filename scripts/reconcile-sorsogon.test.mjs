import test from 'node:test'
import assert from 'node:assert/strict'
import { reconcile } from './reconcile-sorsogon.mjs'

test('identical records reconcile', () => {
  assert.deepEqual(reconcile([{ contractId: '1', budget: 10 }], [{ contractId: '1', budget: 10 }]).missing, [])
})
test('missing and extra records detected', () => {
  const r = reconcile([{ contractId: '1' }], [{ contractId: '2' }])
  assert.deepEqual(r.missing, ['1'])
  assert.deepEqual(r.extra, ['2'])
})
test('changed values and duplicate IDs detected', () => {
  const r = reconcile([{ contractId: '1', budget: 10 }], [{ contractId: '1', budget: 11 }, { contractId: '1', budget: 11 }])
  assert.deepEqual(r.changed, ['1'])
  assert.deepEqual(r.candidateDuplicates, ['1'])
})
