import { isExtension, setValue } from '../helpers/extensionHelper'
import type { QBittorrentServer } from '../models/QBittorrentServer'

const SERVERS_KEY = 'servers'
const ACTIVE_SERVER_KEY = 'activeServerId'
const PENDING_SERVER_KEY = 'pendingServer'

export async function getPendingServer(): Promise<QBittorrentServer | null> {
    if (isExtension()) {
        const result = await chrome.storage.local.get(PENDING_SERVER_KEY)
        return (
            result[PENDING_SERVER_KEY] as
            | QBittorrentServer
            | undefined
        ) ?? null
    }

    const result = localStorage.getItem(PENDING_SERVER_KEY)
    return result
        ? JSON.parse(result)
        : null
}

export async function setPendingServer(server: QBittorrentServer): Promise<void> {
    await setValue(PENDING_SERVER_KEY, server)
}

export async function clearPendingServer(): Promise<void> {
    if (isExtension()) {
        await chrome.storage.local.remove(PENDING_SERVER_KEY)
    } else {
        localStorage.removeItem(PENDING_SERVER_KEY)
    }
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
    if (isExtension()) {
        const result = await chrome.storage.local.get<{ servers?: QBittorrentServer[] }>(SERVERS_KEY)
        return result.servers ?? []
    }
    const value = localStorage.getItem(SERVERS_KEY)
    return value
        ? JSON.parse(value)
        : []
}

export async function saveServers(
    servers: QBittorrentServer[]
): Promise<void> {
    await setValue(SERVERS_KEY, servers)
}

export async function getActiveServerId(): Promise<string | null> {
    if (isExtension()) {
        const result = await chrome.storage.local.get<{ activeServerId?: string }>(ACTIVE_SERVER_KEY)
        return result.activeServerId ?? null
    }
    const value = localStorage.getItem(ACTIVE_SERVER_KEY)
    return value ?? null
}

export async function setActiveServerId(
    serverId: string | null
): Promise<void> {
    await setValue(ACTIVE_SERVER_KEY, serverId)
}
