import { describe, expect, it } from 'vitest'
import { migrateStoredSettings, storageKeys } from './storage'
function fakeStorage(initial: Record<string,string>) {
 const values = new Map(Object.entries(initial))
 return { values, getItem:(key:string)=>values.get(key)??null, setItem:(key:string,value:string)=>{values.set(key,value)}, removeItem:(key:string)=>{values.delete(key)} }
}
describe('storage migration',()=>{
 it('keeps the selected sheet, name and client ID across the app rename',()=>{
  const storage=fakeStorage({'vrishi-sheet-id':'sheet-123','vrishi-sheet-name':'Family points','vrishi-client-id':'client-123'})
  migrateStoredSettings(storage)
  expect(storage.getItem(storageKeys.sheet)).toBe('sheet-123')
  expect(storage.getItem(storageKeys.sheetName)).toBe('Family points')
  expect(storage.getItem(storageKeys.client)).toBe('client-123')
  expect(storage.getItem('vrishi-sheet-id')).toBeNull()
 })
 it('does not replace a newer setting with an old value',()=>{
  const storage=fakeStorage({'vrishi-theme':'hero',[storageKeys.theme]:'soft'})
  migrateStoredSettings(storage)
  expect(storage.getItem(storageKeys.theme)).toBe('soft')
 })
})
