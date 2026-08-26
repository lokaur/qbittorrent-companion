import { useEffect, useState } from "react"
import { TorrentList } from "../components/TorrentList"
import { useServers } from "../hooks/useServers"
import { useTorrents } from "../hooks/useTorrents"
import { useTorrentFilter } from "../hooks/useTorrentFilter"
import { TorrentFilters } from "../components/sidepanel/TorrentFilters"
import { TorrentSearch } from "../components/TorrentSearch"
import { QBittorrentClient } from "../api/QBittorrentClient"
import { getPendingServer, clearPendingServer } from "../storage/serverStore"
import type { TorrentSource } from "../models/TorrentSource"
import { AddTorrentForm } from "../components/AddTorrentForm"
import { Settings, type SettingsMode } from "../components/settings/Settings"
import { useFavoriteLocations } from "../hooks/useFavoriteLocations"
import { isExtension } from "../helpers/extensionHelper"
import { FiExternalLink, FiMoon, FiPlayCircle, FiPlusCircle, FiSettings, FiStar, FiStopCircle, FiSun, FiTrash2 } from "react-icons/fi"
import { DeleteTorrentDialog } from "../components/DeleteTorrentDialog"
import { SpeedIndicator } from "../components/sidepanel/SpeedIndicator"
import { SelectedCounter } from "../components/sidepanel/SelectedCounter"
import type { AddTorrentMode } from "../models/AddTorrentMode"
import type { QBittorrentServer } from "../models/QBittorrentServer"
import { FcAddDatabase } from "react-icons/fc"
import { useTheme } from "../hooks/useTheme"
import type { Theme } from "../models/Theme"

function Popup() {
    const {
        servers,
        activeServer,
        loading: serversLoading,
        selectServer,
        createServer,
        deleteServer
    } = useServers()

    const {
        torrents,
        initialLoading,
        error
    } = useTorrents(activeServer)

    const {
        filter,
        searchText,
        setFilter,
        setSearchText,
        filteredTorrents,
        counts
    } = useTorrentFilter(torrents)

    const {
        locations,
        addLocation,
        deleteLocation
    } = useFavoriteLocations()

    const {
        theme,
        resolvedTheme,
        changeTheme
    } = useTheme()

    const [showSettings, setShowSettings] = useState<SettingsMode | null>(null)
    const [addTorrent, setAddTorrent] = useState<AddTorrentMode | null>(null)
    const [selectedTorrentHashes, setSelectedTorrentHashes] = useState<Set<string>>(new Set())
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [alternativeSpeedEnabled, setAlternativeSpeedEnabled] = useState(false)

    useEffect(() => {
        async function restore() {
            const server = await getPendingServer()

            if (!server) {
                return
            }

            const granted =
                await chrome.permissions.contains({
                    origins: [`${new URL(server.url).origin}/*`]
                })

            if (!granted) {
                await clearPendingServer()
                return
            }

            try {
                const client =
                    new QBittorrentClient(server)

                await client.testConnection()

                await createServer(server)

                await clearPendingServer()
            } catch (error) {
                await clearPendingServer()
                console.error(error)
            }
        }

        if (isExtension()) {
            restore()
        }
    }, [createServer])

    useEffect(() => {
        async function loadSpeedMode() {
            if (!activeServer) {
                setAlternativeSpeedEnabled(false)
                return
            }

            const client = new QBittorrentClient(activeServer)
            try {
                const result = await client.getSpeedLimitsMode()
                setAlternativeSpeedEnabled(result)
            } catch (err) {
                console.log(err)
            }
        }

        loadSpeedMode()
    }, [activeServer])

    if (serversLoading) {
        return <div>Loading...</div>
    }

    if (showSettings) {
        return (
            <div className={`app scrollable theme-${resolvedTheme}`}>
                <Settings
                    mode={showSettings}
                    servers={servers}
                    locations={locations}
                    activeServer={activeServer}
                    onCreateServer={createServer}
                    onDeleteServer={deleteServer}
                    onSelectServer={selectServer}
                    onCreateLocation={addLocation}
                    onDeleteLocation={deleteLocation}
                    onClose={() => setShowSettings(null)}
                />
            </div>
        )
    }

    if (showDeleteDialog) {
        return (
            <div className={`app scrollable theme-${resolvedTheme}`}>
                <DeleteTorrentDialog
                    count={selectedTorrentHashes.size}
                    onCancel={() => setShowDeleteDialog(false)}
                    onDelete={async deleteFiles => {
                        await handleDeleteTorrents(
                            Array.from(selectedTorrentHashes),
                            deleteFiles
                        )

                        setSelectedTorrentHashes(
                            new Set()
                        )

                        setShowDeleteDialog(false)
                    }}
                />
            </div>
        )
    }

    async function handleToggleSpeed(): Promise<void> {
        await handleTorrentAction(async client => {
            await client.toggleAlternativeSpeedLimits()
            const result = await client.getSpeedLimitsMode()
            setAlternativeSpeedEnabled(result)
        })
    }

    async function handleAddTorrent(
        source: TorrentSource,
        downloadPath?: string
    ): Promise<void> {
        await handleTorrentAction(async client =>
            await client.addTorrent(source, downloadPath)
        )
    }

    async function handleDeleteTorrents(
        hashes: string[],
        deleteFiles: boolean
    ): Promise<void> {
        await handleTorrentAction(async client =>
            await client.deleteTorrent(hashes, deleteFiles)
        )
    }

    async function handleTorrentState(
        isPause: boolean,
        hashes: string[]
    ): Promise<void> {
        await handleTorrentAction(async client =>
            await client.updateTorrentsState(isPause, hashes)
        )
    }

    async function handleTorrentAction(
        action: (client: QBittorrentClient) => Promise<void>
    ): Promise<void> {
        if (!activeServer) {
            throw new Error('No server selected')
        }

        const client = new QBittorrentClient(activeServer)
        await action(client)
    }

    function openServer(server: QBittorrentServer) {
        if (!server) {
            return
        }

        if (isExtension()) {
            chrome.tabs.create({
                url: server.url
            })
        } else {
            window.open(
                server.url,
                '_blank',
                'noopener,noreferrer'
            )
        }
    }

    if (addTorrent && activeServer) {
        return (
            <div className={`app scrollable theme-${resolvedTheme}`}>
                <AddTorrentForm
                    openMode={addTorrent}
                    locations={locations}
                    servers={servers}
                    activeServer={activeServer}
                    showServerSelector={false}
                    onCreateLocation={addLocation}
                    onClose={() => setAddTorrent(null)}
                    onAdd={handleAddTorrent}
                />
            </div>
        )
    }

    function toggleTorrentSelection(hash: string) {
        setSelectedTorrentHashes(current => {
            const next = new Set(current)
            if (next.has(hash)) {
                next.delete(hash)
            } else {
                next.add(hash)
            }

            return next
        })
    }

    async function toggleTheme() {
        let nextTheme: Theme
        if (theme === 'system') {
            nextTheme = 'light'
        } else if (theme === 'light') {
            nextTheme = 'dark'
        } else {
            nextTheme = 'system'
        }
        await changeTheme(nextTheme)
    }

    function getThemeIcon() {
        switch (theme) {
            case 'system':
                return (<FiStar size={16} />)
            case 'dark':
                return (<FiMoon size={16} />)
            case 'light':
                return (<FiSun size={16} />)
        }
    }

    return (
        <div className={`app theme-${resolvedTheme}`}>
            <header className="header">
                <h1>{activeServer ? (
                    <button
                        className="server-name-button"
                        title={activeServer.url}
                        onClick={() => openServer(activeServer)}>
                        <span>{activeServer.name}</span>
                        <FiExternalLink size={10} />
                    </button>
                ) : ('qBittorrent')}
                </h1>

                <div className="header-content">
                    <button
                        className="icon-button"
                        title="Add torrent"
                        onClick={() => setAddTorrent('file')}
                    >
                        <FiPlusCircle size={16} />
                    </button>

                    <button
                        className="icon-button"
                        title="Start"
                        disabled={selectedTorrentHashes.size === 0}
                        onClick={async () =>
                            await handleTorrentState(
                                false,
                                Array.from(selectedTorrentHashes))
                        }
                    >
                        <FiPlayCircle size={16} />
                    </button>

                    <button
                        className="icon-button"
                        title="Stop"
                        disabled={selectedTorrentHashes.size === 0}
                        onClick={async () =>
                            await handleTorrentState(
                                true,
                                Array.from(selectedTorrentHashes))
                        }
                    >
                        <FiStopCircle size={16} />
                    </button>

                    <button
                        className="icon-button"
                        title="Delete"
                        disabled={selectedTorrentHashes.size === 0}
                        onClick={() => setShowDeleteDialog(true)}
                    >
                        <FiTrash2 size={16} />
                    </button>

                    <TorrentSearch
                        value={searchText}
                        onChange={setSearchText}
                    />

                    <div className="right-button-container">
                        <button
                            className="icon-button"
                            title={`Theme: ${theme}`}
                            onClick={toggleTheme}
                        >
                            {getThemeIcon()}
                        </button>

                        <button
                            className="icon-button"
                            title="Settings"
                            onClick={() =>
                                setShowSettings('main')
                            }
                        >
                            <FiSettings size={16} />
                        </button>
                    </div>
                </div>
            </header>

            <main className="content">
                <div className="side-panel">
                    <TorrentFilters
                        value={filter}
                        counts={counts}
                        onChange={setFilter}
                    />
                    <SelectedCounter
                        count={selectedTorrentHashes.size}
                        onClear={() => setSelectedTorrentHashes(new Set())}
                    />
                    <SpeedIndicator
                        torrents={torrents}
                        alternativeSpeedEnabled={alternativeSpeedEnabled}
                        onClick={handleToggleSpeed}
                    />
                </div>

                {activeServer && (
                    <TorrentList
                        torrents={filteredTorrents}
                        loading={initialLoading}
                        selectedTorrentHashes={selectedTorrentHashes}
                        toggleTorrentSelection={toggleTorrentSelection}
                        error={error}
                    />
                )}

                {!activeServer && (
                    <div className="initial-state">
                        <button
                            className="secondary-button"
                            onClick={() => setShowSettings('add-server')}>
                            <FcAddDatabase />
                            <span>Add server</span>
                        </button>
                    </div>
                )}
            </main>
        </div>
    )
}

export default Popup
