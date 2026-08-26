import { AiOutlineClose } from 'react-icons/ai'
import './styles/TorrentSearch.css'

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
                    placeholder="Search torrents..."
                    value={value}
                    onChange={event => onChange(event.target.value)}
                />
                {value && (
                    <button
                        className="clear-btn input-side-btn"
                        onClick={() => onChange('')}
                        type="button"
                        aria-label="Clear input"
                    >
                        <AiOutlineClose className="input-side-btn-icon" size={14} />
                    </button>
                )}
            </div>
        </div>
    )
}
