import { browserApi } from '../api/browserApi'
import type { QBittorrentServer } from '../models/QBittorrentServer'

const SERVERS_KEY = 'servers'
const ACTIVE_SERVER_KEY = 'activeServerId'
const PENDING_SERVER_KEY = 'pendingServer'

export async function getPendingServer(): Promise<QBittorrentServer | null> {
    const result = await browserApi.storage.local.get(PENDING_SERVER_KEY)
    return (
        result[PENDING_SERVER_KEY] as
        | QBittorrentServer
        | undefined
    ) ?? null
}

export async function setPendingServer(server: QBittorrentServer): Promise<void> {
    await browserApi.storage.local.set({
        [PENDING_SERVER_KEY]: server
    })
}

export async function clearPendingServer(): Promise<void> {
    await browserApi.storage.local.remove(PENDING_SERVER_KEY)
}

export async function addServer(
    server: QBittorrentServer
): Promise<void> {
    const servers = await getServers()

    await saveServers([
        ...servers,
        server
    ])
}

export async function removeServer(
    serverId: string
): Promise<void> {
    const servers = await getServers()

    await saveServers(
        servers.filter(server => server.id !== serverId)
    )
}

export async function getServers(): Promise<QBittorrentServer[]> {
    const result: { servers?: QBittorrentServer[] } = await browserApi.storage.local.get(SERVERS_KEY)
    return result.servers ?? []
}

export async function saveServers(
    servers: QBittorrentServer[]
): Promise<void> {
    await browserApi.storage.local.set({
        [SERVERS_KEY]: servers
    })
}

export async function getActiveServerId(): Promise<string | null> {
    const result: { activeServerId?: string } = await browserApi.storage.local.get(ACTIVE_SERVER_KEY)
    return result.activeServerId ?? null
}

export async function setActiveServerId(serverId: string | null): Promise<void> {
    await browserApi.storage.local.set({
        [ACTIVE_SERVER_KEY]: serverId
    })
}
