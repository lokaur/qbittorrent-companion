export function formatBytes(bytes: number): string {
    if (bytes === 0) {
        return '0 B'
    }

    const units = ['B', 'KB', 'MB', 'GB', 'TB']
    const index = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${(bytes / Math.pow(1024, index)).toFixed(1)} ${units[index]}`
}

export function formatSpeed(bytesPerSecond: number): string {
    return `${formatBytes(bytesPerSecond)}/s`
}
