import { CONFIG, HEADERS, balance, parseRows, toRow, validateSchema, type Transaction } from './ledger'
import { mockRows } from './mock'
export type Snapshot = { rows: Transaction[], opening: number, childName: string, allowNegative: boolean }
export interface Repository { read(): Promise<Snapshot>; commit(tx: Transaction): Promise<Snapshot>; updateChildName(name: string): Promise<Snapshot> }
export class DemoRepository implements Repository {
  private rows = [...mockRows]
  private childName = 'Kid'
  async read(): Promise<Snapshot> { return {rows:[...this.rows],opening:0,childName:this.childName,allowNegative:false} }
  async updateChildName(name: string): Promise<Snapshot> { this.childName = name; return this.read() }
  async commit(tx: Transaction): Promise<Snapshot> { await new Promise(resolve => setTimeout(resolve, 550)); if (!this.rows.some(row=>row.id===tx.id)) this.rows.unshift(tx); return this.read() }
}
const SCOPE = 'https://www.googleapis.com/auth/drive.file'
const ROOT = 'https://sheets.googleapis.com/v4/spreadsheets'
const config = {clientId:import.meta.env.VITE_GOOGLE_CLIENT_ID as string|undefined,apiKey:import.meta.env.VITE_GOOGLE_API_KEY as string|undefined,appId:import.meta.env.VITE_GOOGLE_APP_ID as string|undefined}
export const googleConfigured = Boolean(config.clientId && config.apiKey && config.appId)
type TokenClient = { requestAccessToken: (options?:{prompt?:string})=>void }
declare global { interface Window { google?: {accounts:{oauth2:{initTokenClient:(options:{client_id:string,scope:string,callback:(result:{access_token?:string,error?:string})=>void})=>TokenClient}},picker:{PickerBuilder:new()=>{addView:(view:unknown)=>unknown,setOAuthToken:(token:string)=>unknown,setDeveloperKey:(key:string)=>unknown,setAppId:(id:string)=>unknown,setCallback:(callback:(data:{action:string,docs?:{id:string,name:string}[]})=>void)=>unknown,build:()=>{setVisible:(visible:boolean)=>void}},ViewId:{SPREADSHEETS:string}}} } }
let token = ''
async function loadScript(src:string):Promise<void> { if (document.querySelector(`script[src="${src}"]`)) return; await new Promise<void>((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=()=>resolve();s.onerror=()=>reject(new Error('Google sign-in could not load. Check your connection.'));document.head.appendChild(s)}) }
export async function authorize(reconnect=false):Promise<void> {
  if (!googleConfigured) throw new Error('Google is not configured. Add the public client settings to .env.local.')
  await loadScript('https://accounts.google.com/gsi/client')
  token = await new Promise<string>((resolve,reject)=>{const client=window.google!.accounts.oauth2.initTokenClient({client_id:config.clientId!,scope:SCOPE,callback:result=>result.access_token?resolve(result.access_token):reject(new Error(result.error||'Google authorization was cancelled'))});client.requestAccessToken({prompt:reconnect?'':'consent'})})
}
export function disconnect():void { token = '' }
export function connected():boolean { return Boolean(token) }
async function api<T>(url:string, options:RequestInit={}):Promise<T> {
  if (!token) throw new Error('Reconnect Google to continue.')
  const response=await fetch(url,{...options,headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json',...options.headers},cache:'no-store'})
  if (response.status===401) { token=''; throw new Error('Google authorization expired. Reconnect and try again.') }
  if (!response.ok) { const body=await response.json().catch(()=>({error:{message:response.statusText}})); throw new Error(body.error?.message||`Google API error ${response.status}`) }
  return response.json() as Promise<T>
}
export async function pickSpreadsheet():Promise<{id:string,name:string}> {
  if (!token) throw new Error('Connect Google first.')
  await loadScript('https://apis.google.com/js/api.js')
  await new Promise<void>((resolve,reject)=>{const gapi=(window as Window & {gapi?:{load:(name:string,options:{callback:()=>void,onerror:()=>void})=>void}}).gapi;if(!gapi)return reject(new Error('Google Picker did not load.'));gapi.load('picker',{callback:resolve,onerror:()=>reject(new Error('Google Picker did not load.'))})})
  const picker=window.google?.picker
  if (!picker) throw new Error('Google Picker did not load. Try refreshing.')
  return new Promise((resolve,reject)=>{
    const builder=new picker.PickerBuilder()
    builder.addView(picker.ViewId.SPREADSHEETS)
    builder.setOAuthToken(token);builder.setDeveloperKey(config.apiKey!);builder.setAppId(config.appId!)
    builder.setCallback(data=>{if(data.action==='picked'&&data.docs?.[0])resolve({id:data.docs[0].id,name:data.docs[0].name});else if(data.action==='cancel')reject(new Error('Sheet selection cancelled.'))})
    builder.build().setVisible(true)
  })
}
export async function createSpreadsheet(name:string,childName='Kid'):Promise<{id:string,name:string}> {
 const body={properties:{title:name},sheets:[{properties:{title:'Config'}},{properties:{title:'Transactions'}}]}
 const created=await api<{spreadsheetId:string,properties:{title:string}}>(ROOT,{method:'POST',body:JSON.stringify(body)})
 await api(`${ROOT}/${encodeURIComponent(created.spreadsheetId)}/values:batchUpdate`,{method:'POST',body:JSON.stringify({valueInputOption:'RAW',data:[{range:'Config!A1:B6',values:CONFIG.map(([key,value])=>[key,key==='child_name'?childName:value])},{range:'Transactions!A1:I1',values:[HEADERS]}]})})
 return {id:created.spreadsheetId,name:created.properties.title}
}
export class SheetsRepository implements Repository {
 constructor(readonly id:string) {}
 async updateChildName(name:string):Promise<Snapshot> {
  await this.read()
  await api(`${ROOT}/${encodeURIComponent(this.id)}/values/Config!B2?valueInputOption=RAW`,{method:'PUT',body:JSON.stringify({values:[[name]]})})
  const after=await this.read()
  if(after.childName!==name)throw new Error('The name change could not be verified. Refresh before retrying.')
  return after
 }
 async read():Promise<Snapshot> {
  const metadata=await api<{sheets?:{properties:{title:string}}[]}>(`${ROOT}/${encodeURIComponent(this.id)}?fields=sheets.properties.title`)
  const titles=new Set(metadata.sheets?.map(sheet=>sheet.properties.title)||[])
  if(!titles.has('Config')||!titles.has('Transactions'))throw new Error('This sheet does not use the Kid Reward Points v1 schema. No data was changed.')
  const data=await api<{valueRanges:{values?:string[][]}[]}>(`${ROOT}/${encodeURIComponent(this.id)}/values:batchGet?ranges=Config!A1:B20&ranges=Transactions!A1:I10000`)
  const configRows=data.valueRanges?.[0]?.values||[]
  const rows=data.valueRanges?.[1]?.values||[]
  const schema=validateSchema(configRows,rows[0]||[])
  return {...schema,rows:parseRows(rows.slice(1))}
 }
 async commit(tx:Transaction):Promise<Snapshot> {
  const before=await this.read()
  if(before.rows.some(row=>row.id===tx.id)) return before
  if(!before.allowNegative&&balance(before.rows,before.opening)+tx.points_delta<0)throw new Error('There are not enough points for this reward.')
  try { await api(`${ROOT}/${encodeURIComponent(this.id)}/values/Transactions!A:I:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,{method:'POST',body:JSON.stringify({values:[toRow(tx)]})}) }
  catch(error) {
   try { const after=await this.read(); if(after.rows.some(row=>row.id===tx.id)) return after } catch { /* Preserve uncertain outcome. */ }
   throw new Error(`The write could not be confirmed. Refresh the sheet before retrying. ${error instanceof Error?error.message:''}`)
  }
  const after=await this.read()
  if(!after.rows.some(row=>row.id===tx.id))throw new Error('Google did not return the new transaction. Refresh before retrying.')
  return after
 }
}
export async function readLegacyRows(id:string):Promise<string[][]> {
 const data=await api<{sheets?:{properties:{title:string}}[]}>(`${ROOT}/${encodeURIComponent(id)}?fields=sheets.properties.title`)
 const title=data.sheets?.[0]?.properties.title
 if(!title)throw new Error('This spreadsheet has no sheets.')
 const result=await api<{values?:string[][]}>(`${ROOT}/${encodeURIComponent(id)}/values/${encodeURIComponent(`'${title.replaceAll("'","''")}'!A1:D10000`)}`)
 return result.values||[]
}
function legacyDate(raw:string):string {
 const match=raw.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/)
 if(!match)throw new Error(`Date ${raw} is not in day-month-year format. Review the source sheet before importing.`)
 const [,day,month,year]=match
 const date=new Date(Date.UTC(Number(year),Number(month)-1,Number(day)))
 if(date.getUTCFullYear()!==Number(year)||date.getUTCMonth()!==Number(month)-1||date.getUTCDate()!==Number(day))throw new Error(`Invalid date ${raw}.`)
 return date.toISOString()
}
export function parseLegacyRows(rows:string[][],name:string,client:string):Transaction[] {
 const transactions:Transaction[]=[]
 let carried=''
 for(const [index,row] of rows.entries()){
  if(index===0)continue
  if(row[0]?.trim())carried=row[0].trim()
  const raw=row[1]?.trim()
  if(!raw&&!row[2]?.trim())continue
  if(!raw||!/^[-+]?\d+$/.test(raw)||!row[2]?.trim()||!carried)throw new Error(`Row ${index+1} needs a date, whole-number points and description. No import was started.`)
  const delta=Number(raw)
  if(!Number.isSafeInteger(delta)||delta===0)throw new Error(`Row ${index+1} has invalid points.`)
  transactions.push({id:crypto.randomUUID(),created_at_iso:legacyDate(carried),type:delta>0?'EARN':'REDEEM',points_delta:delta,description:safeLegacy(row[2]),actor_label:safeLegacy(row[3]||name),approval_method:'imported',source_client_id:client,notes:`Imported from legacy row ${index+1}`})
 }
 return transactions
}
export async function importLegacyRows(rows:string[][],name:string,opening:number,client:string):Promise<{id:string,name:string}> {
 if(!Number.isSafeInteger(opening))throw new Error('Opening balance must be a whole number.')
 const transactions=parseLegacyRows(rows,name,client)
 const file=await createSpreadsheet('Kid Reward Points (imported)',name.trim().slice(0,40))
 await api(`${ROOT}/${encodeURIComponent(file.id)}/values/Config!B4?valueInputOption=RAW`,{method:'PUT',body:JSON.stringify({values:[[opening]]})})
 if(transactions.length)await api(`${ROOT}/${encodeURIComponent(file.id)}/values/Transactions!A:I:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,{method:'POST',body:JSON.stringify({values:transactions.map(toRow)})})
 return file
}
function safeLegacy(value:string){const trimmed=value.trim().slice(0,120);return /^[=+\-@]/.test(trimmed)?"'"+trimmed:trimmed}
