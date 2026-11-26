import { browserApi } from "../api/browserApi"
import type { SortConfig } from "../models/SortConfig"

const SORT_KEY = 'torrentSort'

const DEFAULT_SORT: SortConfig = {
    column: 'name',
    direction: 'asc'
}

export async function getSort(): Promise<SortConfig> {
    const result = await browserApi.storage.local.get(SORT_KEY)
    const stored = result[SORT_KEY] as SortConfig | undefined

    if (!stored || !stored.column || !stored.direction) {
        return DEFAULT_SORT
    }

    return stored
}

export async function saveSort(sort: SortConfig): Promise<void> {
    await browserApi.storage.local.set({
        [SORT_KEY]: sort
    })
}
