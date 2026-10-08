import { describe, expect, it } from 'vitest'
import { balance, parseRows, safeText, validAmount, validateSchema, type Transaction, HEADERS, CONFIG } from './ledger'
const row: Transaction={id:'1',created_at_iso:'2026-10-08T00:00:00.000Z',type:'EARN',points_delta:5,description:'Helped',actor_label:'Vrishi',approval_method:'parent-confirm-ui',source_client_id:'test',notes:''}
describe('ledger rules',()=>{
 it('computes balance from opening amount and signed deltas',()=>expect(balance([row,{...row,id:'2',points_delta:-3}],10)).toBe(12))
 it('accepts only positive whole-number amounts',()=>{expect(validAmount('5')).toBe(5);expect(validAmount('0')).toBeNull();expect(validAmount('-1')).toBeNull();expect(validAmount('1.5')).toBeNull();expect(validAmount('abc')).toBeNull()})
 it('prevents descriptions from becoming formulas',()=>{expect(safeText('=SUM(A1:A2)')).toBe("'=SUM(A1:A2)");expect(safeText('Great job')).toBe('Great job')})
 it('rejects an unknown spreadsheet schema',()=>{expect(validateSchema(CONFIG.map(([a,b])=>[a,b]),[...HEADERS])).toMatchObject({opening:0});expect(()=>validateSchema([['schema_version','2']],[...HEADERS])).toThrow(/schema/);expect(()=>validateSchema(CONFIG.map(([a,b])=>[a,b]),['wrong'])).toThrow(/schema/)})
 it('parses signed transaction rows',()=>expect(parseRows([['1','2026-10-08T00:00:00Z','EARN','5','Helped','Vrishi','parent-confirm-ui','test','']])[0].points_delta).toBe(5))
})
import { parseLegacyRows } from './repository'
describe('legacy import',()=>{
 it('skips B1, carries day-first dates and preserves signed deltas',()=>{
  const rows=[['Date','18390','Activity','Name'],['20-08-2025','5','Brushed teeth','Vrishi'],['','-160','Toy','Vrishi']]
  const parsed=parseLegacyRows(rows,'Vrishi','client')
  expect(parsed).toHaveLength(2)
  expect(parsed[0].created_at_iso).toBe('2025-08-20T00:00:00.000Z')
  expect(parsed[1].points_delta).toBe(-160)
 })
 it('rejects ambiguous rows before any import starts',()=>expect(()=>parseLegacyRows([['Date','Balance'],['','5','Task']],'Vrishi','client')).toThrow(/Row 2/))
})
