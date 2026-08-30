import { useState } from "react"
import type { TorrentSource } from "../models/TorrentSource"
import { AiOutlineClose } from "react-icons/ai"
import type { FavoriteLocation } from "../models/FavoriteLocation"
import type { AddTorrentMode } from "../models/AddTorrentMode"
import { FcExpand } from "react-icons/fc"
import './styles/AddTorrentForm.css'
import { FiUpload } from "react-icons/fi"
import type { QBittorrentServer } from "../models/QBittorrentServer"

const CUSTOM_LOCATION = '__custom__'

interface AddTorrentProps {
    openMode: AddTorrentMode
    openMagnet?: string | null
    locations: FavoriteLocation[]
    servers: QBittorrentServer[]
    activeServer: QBittorrentServer | null
    showServerSelector: boolean
    onCreateLocation: (location: FavoriteLocation) => Promise<void>
    onClose: () => void
    onAdd: (
        source: TorrentSource,
        downloadPath?: string
    ) => Promise<void>
}

export function AddTorrentForm({
    openMode,
    openMagnet,
    locations,
    servers,
    activeServer,
    showServerSelector,
    onCreateLocation,
    onClose,
    onAdd }: AddTorrentProps) {
    const [mode, setMode] = useState<AddTorrentMode>(openMode)
    const [magnetLink, setMagnetLink] = useState(openMagnet ?? '')
    const [torrentFile, setTorrentFile] = useState<File | null>(null)
    const [serverId, setServerId] = useState(activeServer?.id ?? '')

    const [selectedLocationId, setSelectedLocationId] = useState('')
    const [customPath, setCustomPath] = useState('')
    const [saveAsFavorite, setSaveAsFavorite] = useState(false)
    const [favoriteName, setFavoriteName] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const favoriteLocations = locations.filter(location => location.serverId === serverId)
    const selectedLocation = favoriteLocations.find(
        location => location.id === selectedLocationId
    )

    const isCustomLocation = selectedLocationId === CUSTOM_LOCATION

    async function handleSaveAsFavorite(path: string) {
        if (!saveAsFavorite) {
            return
        }

        if (!activeServer) {
            throw new Error('Server not selected')
        }

        if (!favoriteName.trim()) {
            throw new Error('Enter location name')
        }

        const existingLocation = favoriteLocations.find(
            location => location.path === path)

        if (existingLocation) {
            return
        }

        await onCreateLocation({
            id: crypto.randomUUID(),
            name: favoriteName.trim(),
            path: path.trim(),
            serverId: activeServer.id
        })
    }


    async function handleSubmit(event: React.SubmitEvent) {
        event.preventDefault()

        if (!activeServer) {
            setError('Server not selected')
            return
        }

        try {
            setLoading(true)
            setError(null)

            let torrentSource: TorrentSource

            if (mode === 'magnet') {
                const magnet = magnetLink.trim()

                if (!magnet) {
                    throw new Error('Please enter a magnet link')
                }

                torrentSource = {
                    type: 'magnet',
                    value: magnet
                }
            } else {
                if (!torrentFile) {
                    throw new Error('Please select a torrent file')
                }

                torrentSource = {
                    type: 'file',
                    file: torrentFile
                }
            }

            let downloadPath: string | undefined

            if (isCustomLocation) {
                const path = customPath.trim()

                if (!path) {
                    throw new Error('Enter download path')
                }

                downloadPath = path
                await handleSaveAsFavorite(downloadPath)
            } else if (selectedLocation) {
                downloadPath = selectedLocation.path
            }

            await onAdd(
                torrentSource,
                downloadPath
            )
            onClose()
        } catch (e) {
            setError(
                e instanceof Error
                    ? e.message
                    : 'Failed to add torrent')
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) {
        const file = event.target.files?.[0] ?? null
        setTorrentFile(file)
        setError(null)
    }

    return (
        <form className="add-torrent-form"
            onSubmit={handleSubmit}>
            <div className="add-torrent-header">
                <div>
                    <h2>Add torrent</h2>

                    <span>Add torrent file or magnet link</span>
                </div>

                <button
                    type="button"
                    className="icon-button"
                    onClick={onClose}
                >
                    <AiOutlineClose size={16} />
                </button>
            </div>

            <div className="form-content">
                {showServerSelector && servers.length > 0 && (
                    <label className="form-field">
                        <span>Server</span>

                        <div className="select-wrapper">
                            <select
                                value={serverId}
                                onChange={event =>
                                    setServerId(event.target.value)
                                }
                            >
                                {servers.map(server => (
                                    <option
                                        key={server.id}
                                        value={server.id}
                                    >
                                        {server.name}
                                    </option>
                                ))}
                            </select>

                            <span className="select-arrow">
                                <FcExpand />
                            </span>
                        </div>
                    </label>
                )}

                <div className="add-torrent-tabs">
                    <button
                        type="button"
                        className={
                            mode === 'magnet'
                                ? 'add-torrent-tab active'
                                : 'add-torrent-tab'
                        }
                        onClick={() => {
                            setError(null)
                            setMode('magnet')
                        }}
                    >
                        Magnet link
                    </button>

                    <button
                        type="button"
                        className={
                            mode === 'file'
                                ? 'add-torrent-tab active'
                                : 'add-torrent-tab'
                        }
                        onClick={() => {
                            setError(null)
                            setMode('file')
                        }}
                    >
                        Torrent file
                    </button>
                </div>

                {mode === 'magnet' && (
                    <label className="form-field">
                        <span>Magnet link</span>

                        <textarea
                            id="magnet"
                            value={magnetLink}
                            onChange={event => {
                                setMagnetLink(event.target.value)
                                setError(null)
                            }}
                            placeholder="Paste magnet link here..."
                        />
                    </label>
                )}

                {mode === 'file' && (
                    <label className="torrent-file-picker">
                        <input
                            type="file"
                            accept=".torrent"
                            onChange={handleFileChange}
                        />

                        <FiUpload size={24} />

                        <span>
                            {torrentFile
                                ? torrentFile.name
                                : 'Choose torrent file'}
                        </span>
                    </label>
                )}

                <div className="form-field">
                    <span>Download location</span>

                    <div className="select-wrapper">
                        <select
                            key={selectedLocationId}
                            value={selectedLocationId}
                            onChange={event => {
                                setSelectedLocationId(event.target.value)
                                setError(null)
                            }}
                        >
                            <option value="">
                                Default qBittorrent location
                            </option>

                            {favoriteLocations.map(location => (
                                <option
                                    key={location.id}
                                    value={location.id}
                                >
                                    {location.name} — {location.path}
                                </option>
                            ))}

                            <option value={CUSTOM_LOCATION}>
                                Custom path...
                            </option>
                        </select>

                        <span className="select-arrow">
                            <FcExpand />
                        </span>
                    </div>
                </div>

                {isCustomLocation && (
                    <div className="form-field">
                        <span>Custom path</span>

                        <input
                            value={customPath}
                            onChange={event => setCustomPath(event.target.value)}
                            placeholder="/Public/Downloads"
                            autoFocus
                        />
                    </div>
                )}

                {isCustomLocation && (
                    <div className="checkbox-field">
                        <label htmlFor="save-favorite">
                            Save as favorite download location
                        </label>

                        <input
                            id="save-favorite"
                            type="checkbox"
                            checked={saveAsFavorite}
                            onChange={event =>
                                setSaveAsFavorite(event.target.checked)
                            }
                        />
                    </div>
                )}

                {isCustomLocation && saveAsFavorite && (
                    <div className="form-field">
                        <span>Location name</span>

                        <input
                            value={favoriteName}
                            onChange={event =>
                                setFavoriteName(event.target.value)
                            }
                            placeholder="Movies"
                        />
                    </div>
                )}

                {error && (
                    <div
                        className="form-error"
                        role="alert"
                    >
                        <span className="form-error-icon">
                            !
                        </span>

                        <span className="form-error-message">
                            {error}
                        </span>
                    </div>
                )}
            </div>

            <div className="form-actions">
                <button
                    type="button"
                    className="secondary-button"
                    onClick={onClose}
                    disabled={loading}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="primary-button"
                    disabled={
                        loading
                    }
                >
                    {loading
                        ? 'Adding torrent...'
                        : 'Add torrent'}
                </button>
            </div>
        </form>
    )
}

