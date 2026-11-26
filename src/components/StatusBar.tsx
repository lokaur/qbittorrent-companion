import { FcDownload, FcUpload } from "react-icons/fc"
import { RiSlowDownLine, RiSpeedUpLine } from "react-icons/ri"
import { formatBytes, formatSpeed } from "../helpers/speedHelper"
import { t } from "../i18n/i18n"
import type { ServerStatus } from "../api/types"
import './styles/StatusBar.css'

interface StatusBarProps {
    status: ServerStatus | null
    freeSpace: number | null
    disabled: boolean
    onToggleSpeed: () => void
}

export function StatusBar({
    status,
    freeSpace,
    disabled,
    onToggleSpeed
}: StatusBarProps) {
    const connection = status?.connection ?? 'disconnected'

    return (
        <footer className="status-bar">
            <span
                className="status-bar-item status-upload"
                title={t('status_upload_speed')}
            >
                <FcUpload size={14} />
                <span>
                    {formatSpeed(status?.uploadSpeed ?? 0)}
                </span>
                <span className="status-bar-total">
                    ({formatBytes(status?.totalUploaded ?? 0)})
                </span>
            </span>

            <span
                className="status-bar-item status-download"
                title={t('status_download_speed')}
            >
                <FcDownload size={14} />
                <span>
                    {formatSpeed(status?.downloadSpeed ?? 0)}
                </span>
                <span className="status-bar-total">
                    ({formatBytes(status?.totalDownloaded ?? 0)})
                </span>
            </span>

            <span
                className={`status-bar-item status-connection ${connection}`}
            >
                <span className="status-dot" />
                <span>
                    {t(`status_connection_${connection}`)}
                </span>
            </span>

            <button
                type="button"
                className="icon-button status-speed-toggle"
                title={t('toggle_speed')}
                disabled={disabled}
                onClick={onToggleSpeed}
            >
                {status?.alternativeSpeedEnabled
                    ? <RiSlowDownLine size={16} />
                    : <RiSpeedUpLine size={16} />}
            </button>

            <span
                className="status-bar-item status-free-space"
                title={t('status_free_space_hint')}
            >
                {freeSpace == null
                    ? t('status_free_space_unknown')
                    : t('free_space', { size: formatBytes(freeSpace) })}
            </span>
        </footer>
    )
}
