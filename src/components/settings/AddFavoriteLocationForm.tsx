import { useState } from "react";
import type { FavoriteLocation } from "../../models/FavoriteLocation";
import type { QBittorrentServer } from "../../models/QBittorrentServer";
import "./styles/AddFavoriteLocationForm.css"
import { AiOutlineClose } from "react-icons/ai";
import { t } from "../../i18n/i18n"

interface AddFavoriteLocationProps {
    activeServer: QBittorrentServer | null
    onCancel: () => void
    onClose: () => void
    onAdd: (location: FavoriteLocation) => Promise<void>
}

export function AddFavoriteLocationForm({
    activeServer,
    onCancel,
    onClose,
    onAdd
}: AddFavoriteLocationProps) {
    const [name, setName] = useState('')
    const [path, setPath] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(event: React.SubmitEvent) {
        event.preventDefault()

        if (!name.trim() || !path.trim() || !activeServer) {
            return
        }

        try {
            setLoading(true)

            await onAdd({
                id: crypto.randomUUID(),
                name: name.trim(),
                path: path.trim(),
                serverId: activeServer.id
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            className="add-location-form"
            onSubmit={handleSubmit}
        >
            <div className="settings-header">
                <div>
                    <h2>{t('add_location')}</h2>

                    <span>
                        {t('add_location_subtitle')}
                    </span>
                </div>

                <button
                    type="button"
                    className="icon-button"
                    title={t('close')}
                    onClick={onClose}
                >
                    <AiOutlineClose size={16} />
                </button>
            </div>

            <div className="form-content">

                <label className="form-field">
                    <span>{t('name')}</span>

                    <input
                        value={name}
                        onChange={event =>
                            setName(event.target.value)
                        }
                        placeholder={t('location_name_placeholder')}
                        autoFocus
                    />
                </label>

                <label className="form-field">
                    <span>{t('path')}</span>

                    <input
                        value={path}
                        onChange={event =>
                            setPath(event.target.value)
                        }
                        placeholder={t('location_path_placeholder')}
                    />
                </label>

            </div>

            <div className="form-actions">
                <button
                    type="button"
                    className="secondary-button"
                    onClick={onCancel}
                    disabled={loading}
                >
                    {t('cancel')}
                </button>

                <button
                    type="submit"
                    className="primary-button"
                    disabled={
                        loading ||
                        !name.trim() ||
                        !path.trim() ||
                        !activeServer
                    }
                >
                    {loading
                        ? t('adding')
                        : t('add_location')}
                </button>
            </div>
        </form>
    )
}
