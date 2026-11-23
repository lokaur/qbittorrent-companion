import type { TorrentCounts } from "../../hooks/useTorrentFilter";
import type { TorrentFilter } from "../../models/TorrentFilter";
import './styles/TorrentFilters.css'
import { t } from "../../i18n/i18n"

interface TorrentFiltersProps {
    value: TorrentFilter
    counts: TorrentCounts
    onChange: (filter: TorrentFilter) => void
}

const filters: {
    value: TorrentFilter
    labelKey: string
}[] = [
        {
            value: 'all',
            labelKey: 'filter_all'
        },
        {
            value: 'downloading',
            labelKey: 'filter_downloading'
        },
        {
            value: 'seeding',
            labelKey: 'filter_seeding'
        },
        {
            value: 'stopped',
            labelKey: 'filter_stopped'
        },
        {
            value: 'active',
            labelKey: 'filter_active'
        },
        {
            value: 'checking',
            labelKey: 'filter_checking'
        },
        {
            value: 'errored',
            labelKey: 'filter_errored'
        }
    ]

export function TorrentFilters({
    value,
    counts,
    onChange
}: TorrentFiltersProps) {
    return (
        <nav className="torrent-filters">
            {filters.map(filter => (
                <button
                    key={filter.value}
                    className={
                        value === filter.value
                            ? 'active'
                            : ''
                    }
                    onClick={() =>
                        onChange(filter.value)
                    }
                >
                    <span>
                        {t(filter.labelKey)}
                    </span>
                    <span className="torrent-count">
                        {counts[filter.value]}
                    </span>
                </button>
            ))}
        </nav>
    )
}