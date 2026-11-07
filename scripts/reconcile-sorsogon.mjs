#!/usr/bin/env node
// Read-only comparison of two local JSON arrays of project records.
// Usage: node scripts/reconcile-sorsogon.mjs source.json candidate.json
import { readFileSync } from 'node:fs'

export function reconcile(source, candidate) {
  const key = row => String(row.contractId ?? row.reference_id ?? '').trim()
  const summarize = rows => {
    const map = new Map(), duplicates = [], missingIds = []
    for (const row of rows) {
      const id = key(row)
      if (!id) { missingIds.push(row); continue }
      if (map.has(id)) duplicates.push(id)
      else map.set(id, row)
    }
    return { map, duplicates, missingIds: missingIds.length }
  }
  const a = summarize(source), b = summarize(candidate)
  const missing = [...a.map.keys()].filter(id => !b.map.has(id))
  const extra = [...b.map.keys()].filter(id => !a.map.has(id))
  const changed = [...a.map.keys()].filter(id => b.map.has(id) && JSON.stringify(a.map.get(id)) !== JSON.stringify(b.map.get(id)))
  return { sourceCount: source.length, candidateCount: candidate.length, missing, extra, changed, sourceDuplicates: a.duplicates, candidateDuplicates: b.duplicates, sourceMissingIds: a.missingIds, candidateMissingIds: b.missingIds }
}

if (process.argv[1]?.endsWith('reconcile-sorsogon.mjs') && process.argv.length > 2) {
  if (process.argv.length !== 4) { console.error('Usage: node scripts/reconcile-sorsogon.mjs source.json candidate.json'); process.exitCode = 2 }
  else {
    const source = JSON.parse(readFileSync(process.argv[2], 'utf8'))
    const candidate = JSON.parse(readFileSync(process.argv[3], 'utf8'))
    if (!Array.isArray(source) || !Array.isArray(candidate)) throw new Error('Both inputs must be JSON arrays')
    const result = reconcile(source, candidate)
    console.log(JSON.stringify(result, null, 2))
    if (result.missing.length || result.extra.length || result.changed.length || result.sourceDuplicates.length || result.candidateDuplicates.length || result.sourceMissingIds || result.candidateMissingIds) process.exitCode = 1
  }
}
