import { AiOutlineClose } from 'react-icons/ai'
import './styles/TorrentSearch.css'
import { t } from "../i18n/i18n"

interface TorrentSearchProps {
    value: string
    onChange: (value: string) => void
}

export function TorrentSearch({
    value,
    onChange
}: TorrentSearchProps) {
    return (
        <div className="torrent-search">
            <div className="input-with-side-btn">
                <input
                    type="text"
                    placeholder={t('search_placeholder')}
                    value={value}
                    onChange={event => onChange(event.target.value)}
                />
                {value && (
                    <button
                        className="clear-btn input-side-btn"
                        onClick={() => onChange('')}
                        type="button"
                        aria-label={t('clear_input')}
                    >
                        <AiOutlineClose className="input-side-btn-icon" size={14} />
                    </button>
                )}
            </div>
        </div>
    )
}
