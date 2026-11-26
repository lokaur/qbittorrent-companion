export interface TorrentInfo {
    hash: string
    name: string
    size: number
    progress: number
    dlspeed: number
    upspeed: number
    state: string
    eta: number
    numSeeds: number
    numLeechs: number
}

export interface ServerStatus {
    downloadSpeed: number
    uploadSpeed: number
    totalDownloaded: number
    totalUploaded: number
    connection: 'connected' | 'firewalled' | 'disconnected'
    alternativeSpeedEnabled: boolean
}
