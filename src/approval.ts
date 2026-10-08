import type { Repository, Snapshot } from './repository'
import type { Transaction } from './ledger'
import { pinConfigured, verifyPin } from './pin'

export async function commitWithPin(repo: Repository, transaction: Transaction, pin: string): Promise<{snapshot: Snapshot, approved: Transaction}> {
  if (!pinConfigured()) throw new Error('Set up the device PIN in Settings first.')
  if (!(await verifyPin(pin))) throw new Error('Incorrect PIN. Nothing was saved.')
  const approved = {...transaction,approval_method:'local-pin-ui'}
  return {snapshot:await repo.commit(approved),approved}
}
