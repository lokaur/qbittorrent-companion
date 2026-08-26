import { useState } from "react";
import { AddTorrentForm } from "../AddTorrentForm";
import './styles/AddTorrentPage.css'
import type { TorrentSource } from "../../models/TorrentSource";
import { QBittorrentClient } from "../../api/QBittorrentClient";
import { useFavoriteLocations } from "../../hooks/useFavoriteLocations";
import { useServers } from "../../hooks/useServers";
import { useTheme } from "../../hooks/useTheme";

function getInitialSource(): TorrentSource {
    const params = new URLSearchParams(window.location.search)
    const magnet = params.get('magnet')

    return {
        type: 'magnet',
        value: magnet ?? ''
    }
}

export function AddTorrentPage() {
    const {
        servers,
        activeServer
    } = useServers()

    const {
        locations,
        addLocation
    } = useFavoriteLocations()

    const {
        resolvedTheme
    } = useTheme()

    const [source] = useState<TorrentSource>(getInitialSource)

    async function handleAdd(source: TorrentSource, downloadPath?: string) {
        if (!activeServer) {
            throw new Error('No active server selected')
        }

        const client = new QBittorrentClient(activeServer)
        await client.addTorrent(source, downloadPath)
    }

    function handleClose() {
        if (window.history.length > 1) {
            window.history.back()
        } else {
            window.close()
        }
    }

    return (
        <main className={`app scrollable theme-${resolvedTheme} add-torrent-page`}>
            <div className="add-torrent-page-content">
                {activeServer && (
                    <AddTorrentForm
                        openMode={source.type == 'magnet' ? 'magnet' : 'file'}
                        openMagnet={source.type === 'magnet' ? source.value : undefined}
                        locations={locations}
                        servers={servers}
                        activeServer={activeServer}
                        showServerSelector={true}
                        onCreateLocation={addLocation}
                        onClose={handleClose}
                        onAdd={handleAdd}
                    />
                )}
            </div>
        </main>
    )
}
