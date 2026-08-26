import type { TorrentCounts } from "../../hooks/useTorrentFilter";
import type { TorrentFilter } from "../../models/TorrentFilter";
import './styles/TorrentFilters.css'

interface TorrentFiltersProps {
    value: TorrentFilter
    counts: TorrentCounts
    onChange: (filter: TorrentFilter) => void
}

const filters: {
    value: TorrentFilter
    label: string
}[] = [
        {
            value: 'all',
            label: 'All'
        },
        {
            value: 'downloading',
            label: 'Downloading'
        },
        {
            value: 'seeding',
            label: 'Seeding'
        },
        {
            value: 'stopped',
            label: 'Stopped'
        },
        {
            value: 'active',
            label: 'Active'
        },
        {
            value: 'checking',
            label: 'Checking'
        },
        {
            value: 'errored',
            label: 'Errored'
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
                        {filter.label}
                    </span>
                    <span className="torrent-count">
                        {counts[filter.value]}
                    </span>
                </button>
            ))}
        </nav>
    )
}