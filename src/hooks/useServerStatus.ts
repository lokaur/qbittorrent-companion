import { useEffect, useState } from "react"
import type { QBittorrentServer } from "../models/QBittorrentServer"
import type { ServerStatus } from "../api/types"
import { QBittorrentClient } from "../api/QBittorrentClient"

const STATUS_POLL_INTERVAL = 3000
const DISK_POLL_INTERVAL = 30000

export function useServerStatus(
    server: QBittorrentServer | null
) {
    const [status, setStatus] = useState<ServerStatus | null>(null)
    const [freeSpace, setFreeSpace] = useState<number | null>(null)

    useEffect(() => {
        if (!server) {
            return
        }

        const client = new QBittorrentClient(server)

        let cancelled = false

        async function loadStatus() {
            try {
                const result = await client.getServerStatus()

                if (!cancelled) {
                    setStatus(result)
                }
            } catch {
                if (!cancelled) {
                    setStatus(null)
                }
            }
        }

        async function loadFreeSpace() {
            try {
                const result = await client.getFreeDiskSpace()

                if (!cancelled) {
                    setFreeSpace(result)
                }
            } catch {
                if (!cancelled) {
                    setFreeSpace(null)
                }
            }
        }

        loadStatus()
        loadFreeSpace()

        const statusInterval = setInterval(loadStatus, STATUS_POLL_INTERVAL)
        const diskInterval = setInterval(loadFreeSpace, DISK_POLL_INTERVAL)

        return () => {
            cancelled = true
            clearInterval(statusInterval)
            clearInterval(diskInterval)
        }
    }, [server])

    return {
        status,
        freeSpace
    }
}
