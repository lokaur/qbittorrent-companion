import { browserApi } from "../api/browserApi"
import type { ColumnWidths } from "../models/ColumnWidths"
import { MAX_COLUMN_WIDTH, MIN_COLUMN_WIDTH } from "../models/ColumnWidths"

const COLUMNS_KEY = 'columns'

const DEFAULT_COLUMN_WIDTHS: ColumnWidths = {
    name: 260,
    size: 70,
    progress: 90,
    download: 78
}

function clamp(width: number): number {
    return Math.min(MAX_COLUMN_WIDTH, Math.max(MIN_COLUMN_WIDTH, Math.round(width)))
}

export async function getColumnWidths(): Promise<ColumnWidths> {
    const result = await browserApi.storage.local.get(COLUMNS_KEY)
    const stored = result[COLUMNS_KEY] as Partial<ColumnWidths> | undefined

    if (!stored) {
        return DEFAULT_COLUMN_WIDTHS
    }

    return {
        name: clamp(stored.name ?? DEFAULT_COLUMN_WIDTHS.name),
        size: clamp(stored.size ?? DEFAULT_COLUMN_WIDTHS.size),
        progress: clamp(stored.progress ?? DEFAULT_COLUMN_WIDTHS.progress),
        download: clamp(stored.download ?? DEFAULT_COLUMN_WIDTHS.download)
    }
}

export async function saveColumnWidths(
    widths: ColumnWidths
): Promise<void> {
    await browserApi.storage.local.set({
        [COLUMNS_KEY]: {
            name: clamp(widths.name),
            size: clamp(widths.size),
            progress: clamp(widths.progress),
            download: clamp(widths.download)
        }
    })
}
