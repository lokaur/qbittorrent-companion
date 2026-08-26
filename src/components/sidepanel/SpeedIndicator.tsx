import { FcDownload, FcUpload } from "react-icons/fc";
import type { TorrentInfo } from "../../api/types";
import { formatSpeed } from "../../helpers/speedHelper";
import './styles/SpeedIndicator.css'
import { RiSlowDownLine, RiSpeedUpLine } from "react-icons/ri";

interface SpeedIndicatorProps {
    torrents: TorrentInfo[]
    alternativeSpeedEnabled: boolean,
    onClick: () => void
}

export function SpeedIndicator({
    torrents,
    alternativeSpeedEnabled,
    onClick
}: SpeedIndicatorProps) {
    const totalUp = torrents.reduce((acc, torrent) => acc + torrent.upspeed, 0)
    const totalDl = torrents.reduce((acc, torrent) => acc + torrent.dlspeed, 0)

    return (
        <div className="speed-indicator">
            <span>
                Total speed:
                <button
                    type="button"
                    className="icon-button"
                    title="Toggle alternative speed mode"
                    onClick={onClick}
                >
                    {alternativeSpeedEnabled
                        ? <RiSlowDownLine size={16} />
                        : <RiSpeedUpLine size={16} />
                    }
                </button>
            </span>
            <span>
                <FcUpload size={16} /> {formatSpeed(totalUp)}
            </span>

            <span>
                <FcDownload size={16} /> {formatSpeed(totalDl)}
            </span>
        </div>
    )
}
