import { useEffect, useState } from "react";
import type { QBittorrentServer } from "../models/QBittorrentServer";
import type { TorrentInfo } from "../api/types";
import { QBittorrentClient } from "../api/QBittorrentClient";

const POLL_INTERVAL = 2000

export function useTorrents(
    server: QBittorrentServer | null
) {
    const [torrents, setTorrents] = useState<TorrentInfo[]>([])
    const [loadedServerId, setLoadedServerId] = useState<string | null>(null)
    const [initialLoading, setInitialLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        if (!server) {
            return
        }

        const client = new QBittorrentClient(server)

        let cancelled = false

        async function load(initial = false) {
            try {
                if (initial) {
                    setInitialLoading(true)
                }

                const result = await client.getTorrents()
                if (cancelled) {
                    return
                }

                setTorrents(result)
                setError(null)

                if (initial) {
                    setLoadedServerId(server?.id ?? '')
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error
                        ? err
                        : new Error('Unknown error')
                    )
                }
            } finally {
                if (!cancelled && initial) {
                    setInitialLoading(false)
                }
            }
        }

        load(true)

        const interval = setInterval(load, POLL_INTERVAL)

        return () => {
            cancelled = true
            clearInterval(interval)
        }
    }, [server])

    const visibleTorrents =
        loadedServerId === server?.id
            ? torrents
            : []

    return {
        torrents: visibleTorrents,
        initialLoading,
        error
    }
}
