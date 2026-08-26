import { FcDownload, FcUpload } from "react-icons/fc"
import type { TorrentInfo } from "../api/types"
import { formatBytes, formatSpeed } from "../helpers/speedHelper"
import './styles/TorrentRow.css'

interface TorrentRowProps {
    torrent: TorrentInfo
    isEven: boolean
    selected: boolean
    onClick: () => void
}

export function TorrentRow({
    torrent,
    isEven,
    selected,
    onClick
}: TorrentRowProps) {
    const progress = torrent.progress * 100
    return (
        <div
            className={`torrent-row ${isEven ? 'dark' : ''} ${selected ? 'selected' : ''}`}
            onClick={onClick}
        >
            <div className="torrent-name">
                {torrent.name}
            </div>

            <div>
                {formatBytes(torrent.size)}
            </div>

            <div className="torrent-progress">
                <div
                    className="torrent-progress-fill"
                    style={{ width: `${progress}%` }}
                />

                <span className="torrent-progress-text torrent-progress-text-black">
                    {progress.toFixed(1)}%
                </span>

                <span
                    className="torrent-progress-text torrent-progress-text-white"
                    style={{
                        clipPath: `inset(0 ${100 - progress}% 0 0)`
                    }}
                >
                    {progress.toFixed(1)}%
                </span>
            </div>

            <div className="torrent-speed">
                <FcDownload size={12} /> {formatSpeed(torrent.dlspeed)}
            </div>

            <div className="torrent-speed">
                <FcUpload size={12} /> {formatSpeed(torrent.upspeed)}
            </div>
        </div>
    )
}