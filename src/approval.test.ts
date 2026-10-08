import { beforeEach, describe, expect, it, vi } from 'vitest'
import { commitWithPin } from './approval'
import { savePin } from './pin'
import type { Repository, Snapshot } from './repository'
import type { Transaction } from './ledger'
const data=new Map<string,string>()
beforeEach(()=>{data.clear();vi.stubGlobal('localStorage',{getItem:(key:string)=>data.get(key)||null,setItem:(key:string,value:string)=>{data.set(key,value)}})})
const tx:Transaction={id:'test-id',created_at_iso:'2026-10-08T00:00:00Z',type:'EARN',points_delta:5,description:'Helped',actor_label:'Vrishi',approval_method:'parent-confirm-ui',source_client_id:'test',notes:''}
const snapshot:Snapshot={rows:[tx],opening:0,childName:'Vrishi',allowNegative:false}
describe('approval gate',()=>{
 it('never calls the repository without a configured and correct PIN',async()=>{
  const commit=vi.fn(async (_transaction:Transaction)=>snapshot)
  const repo={commit,read:async()=>snapshot,updateChildName:async()=>snapshot} satisfies Repository
  await expect(commitWithPin(repo,tx,'123456')).rejects.toThrow(/Set up/)
  await savePin('123456')
  await expect(commitWithPin(repo,tx,'000000')).rejects.toThrow(/Incorrect PIN/)
  expect(commit).not.toHaveBeenCalled()
 })
 it('marks a verified UI approval honestly',async()=>{
  await savePin('123456')
  const commit=vi.fn(async (_transaction:Transaction)=>snapshot)
  const repo={commit,read:async()=>snapshot,updateChildName:async()=>snapshot} satisfies Repository
  const result=await commitWithPin(repo,tx,'123456')
  expect(commit).toHaveBeenCalledOnce()
  expect(commit.mock.calls[0][0]).toMatchObject({id:'test-id',approval_method:'local-pin-ui'})
  expect(result.snapshot).toBe(snapshot)
 })
})
