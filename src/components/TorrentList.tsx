import { useEffect, useMemo, useState } from "react"
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react"
import type { TorrentInfo } from "../api/types"
import type { ColumnWidths } from "../models/ColumnWidths"
import type { SortColumn, SortConfig } from "../models/SortConfig"
import {
    MIN_COLUMN_WIDTH
} from "../models/ColumnWidths"
import { getColumnWidths, saveColumnWidths } from "../storage/columnStore"
import { getSort, saveSort } from "../storage/sortStore"
import { FiArrowDown, FiArrowUp } from "react-icons/fi"
import { TorrentRow } from "./TorrentRow"
import './styles/TorrentList.css'
import { t } from "../i18n/i18n"

interface TorrentListProps {
    torrents: TorrentInfo[]
    selectedTorrentHashes: Set<string>
    loading: boolean
    toggleTorrentSelection: (hash: string) => void
    error: Error | null
}

const COLUMN_GAP = 8
const HEADER_PADDING = 6
const UPLOAD_MIN_WIDTH = 60

const HEADER_COLUMNS: Array<{
    column: SortColumn
    labelKey: string
    resizable: boolean
}> = [
    { column: 'name', labelKey: 'column_name', resizable: true },
    { column: 'size', labelKey: 'column_size', resizable: true },
    { column: 'progress', labelKey: 'column_progress', resizable: true },
    { column: 'download', labelKey: 'column_download', resizable: true },
    { column: 'upload', labelKey: 'column_upload', resizable: false }
]

function getSortValue(
    torrent: TorrentInfo,
    column: SortColumn
): number | string {
    switch (column) {
        case 'name':
            return torrent.name.toLowerCase()
        case 'size':
            return torrent.size
        case 'progress':
            return torrent.progress
        case 'download':
            return torrent.dlspeed
        default:
            return torrent.upspeed
    }
}

export function TorrentList({
    torrents,
    selectedTorrentHashes,
    loading,
    toggleTorrentSelection,
    error
}: TorrentListProps) {
    const [widths, setWidths] = useState<ColumnWidths>({
        name: 260,
        size: 70,
        progress: 90,
        download: 78
    })

    useEffect(() => {
        async function load() {
            setWidths(await getColumnWidths())
        }

        load()
    }, [])

    const [sort, setSort] = useState<SortConfig>({
        column: 'name',
        direction: 'asc'
    })

    useEffect(() => {
        async function load() {
            setSort(await getSort())
        }

        load()
    }, [])

    function handleSort(column: SortColumn) {
        const next: SortConfig = sort.column === column
            ? {
                column,
                direction: sort.direction === 'asc' ? 'desc' : 'asc'
            }
            : {
                column,
                direction: column === 'name' ? 'asc' : 'desc'
            }

        setSort(next)
        saveSort(next)
    }

    const sortedTorrents = useMemo(() => {
        return [...torrents].sort((a, b) => {
            const left = getSortValue(a, sort.column)
            const right = getSortValue(b, sort.column)

            const result = typeof left === 'string' && typeof right === 'string'
                ? left.localeCompare(right)
                : Number(left) - Number(right)

            return sort.direction === 'asc' ? result : -result
        })
    }, [torrents, sort])

    function startResize(
        column: keyof ColumnWidths,
        event: ReactPointerEvent<HTMLSpanElement>
    ) {
        event.preventDefault()

        const startX = event.clientX
        const startWidth = widths[column]
        const containerWidth = event.currentTarget
            .closest('.torrent-table')
            ?.getBoundingClientRect()
            .width ?? 0
        let current = startWidth

        const onMove = (moveEvent: PointerEvent) => {
            const otherColumns = (Object.keys(widths) as (keyof ColumnWidths)[])
                .filter(key => key !== column)
                .reduce((sum, key) => sum + widths[key], 0)

            const available = Math.max(
                MIN_COLUMN_WIDTH,
                containerWidth
                    - HEADER_PADDING * 2
                    - COLUMN_GAP * 4
                    - UPLOAD_MIN_WIDTH
                    - otherColumns
            )

            current = Math.min(
                available,
                Math.max(
                    MIN_COLUMN_WIDTH,
                    startWidth + moveEvent.clientX - startX
                )
            )

            setWidths(previous => ({
                ...previous,
                [column]: current
            }))
        }

        const onUp = () => {
            document.removeEventListener('pointermove', onMove)
            document.removeEventListener('pointerup', onUp)

            saveColumnWidths({ ...widths, [column]: current })
        }

        document.addEventListener('pointermove', onMove)
        document.addEventListener('pointerup', onUp)
    }

    const gridStyle = {
        '--torrent-columns':
            `${widths.name}px ${widths.size}px ${widths.progress}px ${widths.download}px minmax(60px, 1fr)`
    } as CSSProperties

    if (error) {
        return (
            <div className="torrent-list-state">
                <span>{t('error_with_message', { message: error.message })}</span>
            </div>
        )
    }

    if (loading && torrents.length === 0) {
        return (
            <div className="torrent-list-state">
                <span>{t('loading')}</span>
            </div>
        )
    }

    if (torrents.length === 0) {
        return (
            <div className="torrent-list-state">
                <span>{t('no_torrents')}</span>
            </div>
        )
    }

    return (
        <div className="torrent-table" style={gridStyle}>
            <div className="torrent-table-header">
                {HEADER_COLUMNS.map(({ column, labelKey, resizable }) => (
                    <div
                        key={column}
                        className={`torrent-header-cell ${sort.column === column ? 'torrent-header-cell-active' : ''}`}
                    >
                        <button
                            type="button"
                            className="torrent-header-sort"
                            title={t('sort_by_column', { column: t(labelKey) })}
                            onClick={() => handleSort(column)}
                        >
                            <span>{t(labelKey)}</span>
                            {sort.column === column && (
                                sort.direction === 'asc'
                                    ? <FiArrowUp size={12} />
                                    : <FiArrowDown size={12} />
                            )}
                        </button>

                        {resizable && (
                            <span
                                className="torrent-resizer"
                                title={t('resize_column')}
                                onPointerDown={event => startResize(
                                    column as keyof ColumnWidths,
                                    event
                                )}
                            />
                        )}
                    </div>
                ))}
            </div>

            <div className="torrent-list">
                {sortedTorrents
                    .map((torrent, index) => (
                        <TorrentRow
                            isEven={index % 2 === 0}
                            key={torrent.hash}
                            torrent={torrent}
                            selected={selectedTorrentHashes.has(torrent.hash)}
                            onClick={() => toggleTorrentSelection(torrent.hash)}
                        />
                    ))}
            </div>
        </div>
    )
}
