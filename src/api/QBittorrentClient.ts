import type { QBittorrentServer } from "../models/QBittorrentServer";
import type { TorrentSource } from "../models/TorrentSource";
import type { ServerStatus, TorrentInfo } from "./types";

export class QBittorrentClient {
    private readonly baseUrl: string
    private readonly server: QBittorrentServer
    private authenticated = false

    constructor(
        server: QBittorrentServer
    ) {
        this.server = server
        this.baseUrl = (import.meta.env.DEV
            ? '/qbt'
            : server.url.replace(/\/$/, '')) + '/api/v2'
    }

    private async login(): Promise<void> {
        const body = new URLSearchParams({
            username: this.server.username,
            password: this.server.password
        })

        const response = await fetch(
            `${this.baseUrl}/auth/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: body.toString(),
                credentials: 'include'
            }
        )

        const result = await response.text()

        if (!response.ok) {
            throw new Error(`qBittorrent login failed: ${result}`)
        }

        this.authenticated = true
    }

    async getTorrents(): Promise<TorrentInfo[]> {
        const response = await this.authenticatedRequest('/torrents/info')
        return response.json()
    }

    async addTorrent(source: TorrentSource, downloadPath?: string): Promise<void> {
        const formData = new FormData()

        switch (source.type) {
            case 'magnet':
                formData.append('urls', source.value)
                break
            case 'file':
                formData.append(
                    'torrents',
                    source.file,
                    source.file.name
                )
                break
        }

        if (downloadPath) {
            formData.append('savepath', downloadPath)
        }

        const response = await this.authenticatedRequest(
            '/torrents/add',
            'POST',
            formData
        )

        const result = await response.text()

        if (!response.ok) {
            throw new Error(`Error adding torrent: ${result}`)
        }
    }

    async deleteTorrent(
        hashes: string[],
        deleteFiles: boolean
    ): Promise<void> {
        if (hashes.length == 0) {
            return
        }

        const formData = new FormData()
        formData.append(
            'hashes',
            hashes.join('|')
        )

        formData.append(
            'deleteFiles',
            String(deleteFiles)
        )

        const response = await this.authenticatedRequest(
            '/torrents/delete',
            'POST',
            formData
        )

        if (!response.ok) {
            throw new Error(`Failed to delete torrents: ${response.status}`)
        }
    }

    async updateTorrentsState(
        isPause: boolean,
        hashes: string[]
    ) {
        if (hashes.length == 0) {
            return
        }

        await this.authenticatedRequest(
            `/torrents/${isPause ? 'stop' : 'start'}`,
            'POST',
            new URLSearchParams({
                hashes: hashes.join('|')
            }))
    }

    async getSpeedLimitsMode(): Promise<boolean> {
        const response = await this.authenticatedRequest('/transfer/speedLimitsMode')
        const result = await response.text()

        return result.trim() === '1'
    }

    async getServerStatus(): Promise<ServerStatus> {
        const response = await this.authenticatedRequest('/transfer/info')
        const info = await response.json()

        return {
            downloadSpeed: Number(info.dl_info_speed ?? 0),
            uploadSpeed: Number(info.up_info_speed ?? 0),
            totalDownloaded: Number(info.dl_info_data ?? 0),
            totalUploaded: Number(info.up_info_data ?? 0),
            connection:
                info.connection_status === 'connected'
                    ? 'connected'
                    : info.connection_status === 'firewalled'
                        ? 'firewalled'
                        : 'disconnected',
            alternativeSpeedEnabled: await this.getSpeedLimitsMode()
        }
    }

    async getFreeDiskSpace(): Promise<number | null> {
        const response = await this.authenticatedRequest('/sync/maindata')
        const data = await response.json()
        const freeSpace = data?.server_state?.free_space_on_disk

        return Number.isFinite(freeSpace) && freeSpace >= 0
            ? Number(freeSpace)
            : null
    }

    async toggleAlternativeSpeedLimits(): Promise<void> {
        await this.authenticatedRequest('/transfer/toggleSpeedLimitsMode', 'POST')
    }

    async testConnection(): Promise<void> {
        await this.login()

        const response = await fetch(
            `${this.baseUrl}/app/version`,
            {
                credentials: 'include'
            }
        )

        if (!response.ok) {
            throw new Error(
                `Connection test failed: ${response.status}`
            )
        }
    }

    async authenticatedRequest(
        requestPath: string,
        method: string = 'GET',
        body?: BodyInit | null
    ): Promise<Response> {
        if (!this.authenticated) {
            await this.login()
        }

        const response = await fetch(
            `${this.baseUrl + requestPath}`,
            {
                method,
                credentials: 'include',
                body
            }
        )

        if (response.status === 403) {
            this.authenticated = false
            await this.login()
            return this.authenticatedRequest(requestPath, method, body)
        }

        if (!response.ok) {
            throw new Error(`qBittorrent getTorrents failed: ${response.status}`)
        }

        return response
    }
}
