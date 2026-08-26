import { useMemo, useState } from "react";
import type { TorrentInfo } from "../api/types";
import type { TorrentFilter } from "../models/TorrentFilter";

export interface TorrentCounts {
    all: number
    downloading: number
    seeding: number
    stopped: number
    checking: number
    active: number
    errored: number
}

function isDownloading(torrent: TorrentInfo): boolean {
    return (
        torrent.state === 'downloading' ||
        torrent.state === 'stalledDL' ||
        torrent.state === 'metaDL'
    )
}

function isSeeding(torrent: TorrentInfo): boolean {
    return (
        torrent.state === 'uploading' ||
        torrent.state === 'stalledUP' ||
        torrent.state === 'forcedUP'
    )
}

function isChecking(torrent: TorrentInfo): boolean {
    return (
        torrent.state === 'checkingUP' ||
        torrent.state === 'checkingDL' ||
        torrent.state === 'checkingResumeData'
    )
}

function isStopped(torrent: TorrentInfo): boolean {
    return (
        torrent.state === 'stoppedDL' ||
        torrent.state === 'stoppedUP'
    )
}

function isErrored(torrent: TorrentInfo): boolean {
    return (
        torrent.state === 'error'
    )
}

function isActive(torrent: TorrentInfo): boolean {
    return (
        torrent.dlspeed > 0 ||
        torrent.upspeed > 0
    )
}

export function useTorrentFilter(
    torrents: TorrentInfo[]
) {
    const [filter, setFilter] = useState<TorrentFilter>('all')
    const [searchText, setSearchText] = useState('')
    const counts = useMemo(() => {
        return {
            all: torrents.length,
            downloading: torrents.filter(isDownloading).length,
            seeding: torrents.filter(isSeeding).length,
            stopped: torrents.filter(isStopped).length,
            checking: torrents.filter(isChecking).length,
            active: torrents.filter(isActive).length,
            errored: torrents.filter(isErrored).length
        }
    }, [torrents])

    const filteredTorrents = useMemo(() => {
        const filteredTorrents = torrents.filter(
            torrent => torrent.name.toLowerCase().includes(searchText.toLowerCase()))
        switch (filter) {
            case 'downloading':
                return filteredTorrents.filter(isDownloading)
            case 'seeding':
                return filteredTorrents.filter(isSeeding)
            case 'active':
                return filteredTorrents.filter(isActive)
            case 'stopped':
                return filteredTorrents.filter(isStopped)
            case 'checking':
                return filteredTorrents.filter(isChecking)
            case 'errored':
                return filteredTorrents.filter(isErrored)
            case 'all':
                return filteredTorrents
        }
    }, [torrents, filter, searchText])

    return {
        filter,
        searchText,
        setFilter,
        setSearchText,
        filteredTorrents,
        counts
    }
}