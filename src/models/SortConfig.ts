export type SortColumn = 'name' | 'size' | 'progress' | 'download' | 'upload'

export interface SortConfig {
    column: SortColumn
    direction: 'asc' | 'desc'
}
