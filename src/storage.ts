export const storageKeys = {
  sheet: 'kid-reward-sheet-id',
  sheetName: 'kid-reward-sheet-name',
  theme: 'kid-reward-theme',
  client: 'kid-reward-client-id',
  draft: 'kid-reward-draft',
} as const

const previousKeys = {
  sheet: 'vrishi-sheet-id',
  sheetName: 'vrishi-sheet-name',
  theme: 'vrishi-theme',
  client: 'vrishi-client-id',
  draft: 'vrishi-draft',
} as const

export function migrateStoredSettings(storage: Pick<Storage, 'getItem'|'setItem'|'removeItem'>): void {
  for (const key of Object.keys(storageKeys) as (keyof typeof storageKeys)[]) {
    const previous = storage.getItem(previousKeys[key])
    if (previous === null) continue
    if (storage.getItem(storageKeys[key]) === null) storage.setItem(storageKeys[key], previous)
    storage.removeItem(previousKeys[key])
  }
}
