import { useState } from "react"
import { FiTrash, FiTrash2 } from "react-icons/fi"
import './styles/DeleteTorrentDialog.css'

interface DeleteTorrentDialogProps {
    count: number,
    onCancel: () => void
    onDelete: (deleteFiles: boolean) => Promise<void>
}

export function DeleteTorrentDialog({
    count,
    onCancel,
    onDelete
}: DeleteTorrentDialogProps) {
    const [deleteFiles, setDeleteFiles] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleDelete() {
        try {
            setLoading(true)
            setError(null)

            await onDelete(deleteFiles)
        } catch (e) {
            console.log(e)
            setError(e instanceof Error
                ? e.message
                : 'Failed to delete torrent'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="modal-overlay">
            <div className="delete-dialog">
                <div className="delete-dialog-icon">
                    <FiTrash size={20} />
                </div>

                <h3>Delete {count > 1 ? `${count} torrents` : 'torrent'}?</h3>

                <p>
                    The selected torrent{count > 1 ? 's' : ''} will be removed from qBittorrent
                </p>

                <label className="delete-files-option">
                    <input
                        type="checkbox"
                        checked={deleteFiles}
                        onChange={event => setDeleteFiles(event.target.checked)}
                        disabled={loading}
                    />
                    <span>
                        Delete torrent files and data
                    </span>
                </label>

                {error && (
                    <div
                        className="form-error"
                        role="alert"
                    >
                        <span className="form-error-icon">
                            !
                        </span>

                        <span className="form-error-message">
                            {error}
                        </span>
                    </div>
                )}

                <div className="dialog-actions">
                    <button
                        className="secondary-button"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </button>

                    <button
                        className="danger-button"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        <FiTrash2 size={15} />

                        {loading
                            ? 'Deleting...'
                            : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    )
}