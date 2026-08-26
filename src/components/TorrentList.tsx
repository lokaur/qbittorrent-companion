import type { TorrentInfo } from "../api/types"
import { TorrentRow } from "./TorrentRow"
import './styles/TorrentList.css'

interface TorrentListProps {
    torrents: TorrentInfo[]
    selectedTorrentHashes: Set<string>
    loading: boolean
    toggleTorrentSelection: (hash: string) => void
    error: Error | null
}

export function TorrentList({
    torrents,
    selectedTorrentHashes,
    loading,
    toggleTorrentSelection,
    error
}: TorrentListProps) {
    if (error) {
        return (
            <div className="torrent-list-state">
                <span>Error: {error.message}</span>
            </div>
        )
    }

    if (loading && torrents.length === 0) {
        return (
            <div className="torrent-list-state">
                <span>Loading...</span>
            </div>
        )
    }

    if (torrents.length === 0) {
        return (
            <div className="torrent-list-state">
                <span>No torrents found</span>
            </div>
        )
    }

    return (
        <div className="torrent-list">
            {torrents
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
    )
}
