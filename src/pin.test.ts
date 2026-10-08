import { beforeEach, describe, expect, it, vi } from 'vitest'
import { pinConfigured, savePin, verifyPin } from './pin'
const data = new Map<string,string>()
beforeEach(() => { data.clear(); vi.stubGlobal('localStorage',{getItem:(key:string)=>data.get(key)||null,setItem:(key:string,value:string)=>{data.set(key,value)},removeItem:(key:string)=>{data.delete(key)}}) })
describe('device PIN gate',()=>{
 it('stores only a salted hash and verifies the six-digit PIN',async()=>{
  await savePin('123456')
  expect(pinConfigured()).toBe(true)
  expect([...data.values()][0]).not.toContain('123456')
  expect(await verifyPin('123456')).toBe(true)
  expect(await verifyPin('000000')).toBe(false)
 })
 it('requires the current PIN to change it',async()=>{
  await savePin('123456')
  await expect(savePin('654321','000000')).rejects.toThrow(/incorrect/)
  await savePin('654321','123456')
  expect(await verifyPin('654321')).toBe(true)
  expect(await verifyPin('123456')).toBe(false)
 })
 it('keeps the existing PIN after the app rename',async()=>{
  await savePin('123456')
  const record=data.get('kid-reward-local-pin-v1')!
  data.delete('kid-reward-local-pin-v1')
  data.set('vrishi-local-pin-v1',record)
  expect(await verifyPin('123456')).toBe(true)
  expect(data.has('vrishi-local-pin-v1')).toBe(false)
 })
 it('rejects short and nonnumeric PINs',async()=>{
  await expect(savePin('1234')).rejects.toThrow(/6 digits/)
  await expect(savePin('abcdef')).rejects.toThrow(/6 digits/)
 })
})
