import { useState } from "react"
import { FiTrash, FiTrash2 } from "react-icons/fi"
import './styles/DeleteTorrentDialog.css'
import { t } from "../i18n/i18n"

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
                : t('failed_to_delete')
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

                <h3>{t('delete_torrents_title', { count })}</h3>

                <p>
                    {t('delete_torrents_description', { count })}
                </p>

                <label className="delete-files-option">
                    <input
                        type="checkbox"
                        checked={deleteFiles}
                        onChange={event => setDeleteFiles(event.target.checked)}
                        disabled={loading}
                    />
                    <span>
                        {t('delete_files')}
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
                        {t('cancel')}
                    </button>

                    <button
                        className="danger-button"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        <FiTrash2 size={15} />

                        {loading
                            ? t('deleting')
                            : t('delete')}
                    </button>
                </div>
            </div>
        </div>
    )
}