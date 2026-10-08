const KEY = 'kid-reward-local-pin-v1'
const PREVIOUS_KEY = 'vrishi-local-pin-v1'
const ITERATIONS = 120_000
const PIN_PATTERN = /^\d{6}$/
type RecordV1 = { version: 1, salt: string, hash: string }

function hex(bytes: Uint8Array): string { return [...bytes].map(byte => byte.toString(16).padStart(2, '0')).join('') }
function bytes(value: string): Uint8Array { return Uint8Array.from(value.match(/.{2}/g)?.map(part => parseInt(part, 16)) || []) }
function stored(): RecordV1 | null {
  try {
    const previous = localStorage.getItem(PREVIOUS_KEY)
    if (previous !== null) {
      if (localStorage.getItem(KEY) === null) localStorage.setItem(KEY, previous)
      localStorage.removeItem(PREVIOUS_KEY)
    }
    const value = JSON.parse(localStorage.getItem(KEY) || 'null') as RecordV1 | null
    return value?.version === 1 && /^[0-9a-f]{32}$/.test(value.salt) && /^[0-9a-f]{64}$/.test(value.hash) ? value : null
  } catch { return null }
}
export function pinConfigured(): boolean { return stored() !== null }
async function hashPin(pin: string, salt: Uint8Array): Promise<string> {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(pin), 'PBKDF2', false, ['deriveBits'])
  const result = await crypto.subtle.deriveBits({name:'PBKDF2',salt:salt as BufferSource,iterations:ITERATIONS,hash:'SHA-256'},key,256)
  return hex(new Uint8Array(result))
}
export async function verifyPin(pin: string): Promise<boolean> {
  const record = stored()
  if (!record || !PIN_PATTERN.test(pin)) return false
  const actual = await hashPin(pin, bytes(record.salt))
  let mismatch = 0
  for (let i = 0; i < actual.length; i++) mismatch |= actual.charCodeAt(i) ^ record.hash.charCodeAt(i)
  return mismatch === 0
}
export async function savePin(next: string, current = ''): Promise<void> {
  if (!PIN_PATTERN.test(next)) throw new Error('Use exactly 6 digits for the device PIN.')
  if (pinConfigured() && !(await verifyPin(current))) throw new Error('Current PIN is incorrect.')
  const salt = crypto.getRandomValues(new Uint8Array(16))
  localStorage.setItem(KEY, JSON.stringify({version:1,salt:hex(salt),hash:await hashPin(next,salt)} satisfies RecordV1))
}
