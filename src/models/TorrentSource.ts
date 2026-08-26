export type TorrentSource =
    | {
        type: 'magnet'
        value: string
    }
    | {
        type: 'file'
        file: File
    }
