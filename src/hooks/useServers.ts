import { useCallback, useEffect, useState } from "react";
import type { QBittorrentServer } from "../models/QBittorrentServer";
import { addServer, getActiveServerId, getServers, removeServer, setActiveServerId } from "../storage/serverStore";
import { removeLocationsByServerId } from "../storage/locationStore";

export function useServers() {
    const [servers, setServers] = useState<QBittorrentServer[]>([])
    const [activeServer, setActiveServer] = useState<QBittorrentServer | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function load() {
            const storedServers = await getServers()
            const activeServerId = await getActiveServerId()

            setServers(storedServers)
            const active = storedServers.find(server => server.id == activeServerId)
            setActiveServer(active ?? storedServers[0] ?? null)
            setLoading(false)
        }

        load()
    }, [])

    const selectServer = useCallback(
        async (server: QBittorrentServer) => {
            setActiveServer(server)
            await setActiveServerId(server.id)
        },
        []
    )

    const createServer = useCallback(
        async (server: QBittorrentServer) => {
            await addServer(server)
            setServers(current => [
                ...current,
                server
            ])
            setActiveServer(server)
            await setActiveServerId(server.id)
        },
        []
    )

    const deleteServer = useCallback(
        async (serverId: string) => {
            if (activeServer?.id == serverId) {
                const servers = await getServers()
                const otherServer = servers.find(server => server.id != serverId)
                if (otherServer) {
                    await selectServer(otherServer)
                }
            }
            await removeServer(serverId)
            await removeLocationsByServerId(serverId)
            const servers = await getServers()
            setServers(servers)
            if (servers.length == 0) {
                setActiveServer(null)
                await setActiveServerId(null)
            }
        },
        [activeServer, selectServer]
    )

    return {
        servers,
        activeServer,
        loading,
        selectServer,
        createServer,
        deleteServer
    }
}