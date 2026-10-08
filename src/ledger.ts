export type Transaction = {
  id: string
  created_at_iso: string
  type: 'EARN' | 'REDEEM' | 'ADJUSTMENT'
  points_delta: number
  description: string
  actor_label: string
  approval_method: string
  source_client_id: string
  notes: string
}
export const HEADERS = ['id','created_at_iso','type','points_delta','description','actor_label','approval_method','source_client_id','notes'] as const
export const CONFIG: [string,string][] = [['schema_version','1'],['child_name','Kid'],['points_per_rupee','1'],['opening_balance','0'],['theme','hero'],['allow_negative_balance','false']]
export function balance(rows: Transaction[], opening = 0): number { return opening + rows.reduce((sum, row) => sum + row.points_delta, 0) }
export function validAmount(value: string): number | null { const n = Number(value); return /^\d+$/.test(value) && Number.isSafeInteger(n) && n > 0 ? n : null }
export function safeText(value: string): string { const trimmed = value.trim().slice(0,120); return /^[=+\-@]/.test(trimmed) ? "'" + trimmed : trimmed }
export function parseRows(rows: string[][]): Transaction[] {
  const seen = new Set<string>()
  return rows.flatMap((row, index) => {
    if (row.every(cell => !cell?.trim())) return []
    const delta = Number(row[3])
    if (!row[0] || seen.has(row[0]) || !Number.isFinite(Date.parse(row[1])) || !['EARN','REDEEM','ADJUSTMENT'].includes(row[2]) || !row[3]?.trim() || !Number.isSafeInteger(delta) || !row[4]?.trim()) throw new Error(`Invalid transaction at sheet row ${index + 2}. No balance was calculated.`)
    seen.add(row[0])
    return [Object.fromEntries(HEADERS.map((header, i) => [header, header === 'points_delta' ? delta : (row[i] || '')])) as Transaction]
  })
}
export function toRow(tx: Transaction): (string|number)[] { return HEADERS.map(header => tx[header]) }
export function validateSchema(configRows: string[][], headers: string[]): {opening: number, childName: string, allowNegative: boolean} {
  const config = Object.fromEntries(configRows.filter(row => row.length >= 2))
  if (config.schema_version !== '1' || HEADERS.some((header,i) => headers[i] !== header)) throw new Error('This sheet does not use the Kid Reward Points v1 schema. No data was changed.')
  const opening = Number(config.opening_balance)
  if (!Number.isSafeInteger(opening)) throw new Error('Opening balance in the sheet is invalid.')
  return { opening, childName: config.child_name || 'Kid', allowNegative: config.allow_negative_balance === 'true' }
}
export function newTransaction(type: 'EARN'|'REDEEM', points: number, description: string, actor: string, clientId: string): Transaction {
  return {id:crypto.randomUUID(),created_at_iso:new Date().toISOString(),type,points_delta:type==='EARN'?points:-points,description:safeText(description),actor_label:safeText(actor),approval_method:'parent-confirm-ui',source_client_id:clientId,notes:''}
}
