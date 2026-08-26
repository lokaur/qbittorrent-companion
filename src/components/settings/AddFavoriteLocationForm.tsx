import { useState } from "react";
import type { FavoriteLocation } from "../../models/FavoriteLocation";
import type { QBittorrentServer } from "../../models/QBittorrentServer";
import "./styles/AddFavoriteLocationForm.css"
import { AiOutlineClose } from "react-icons/ai";

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
                    <h2>Add location</h2>

                    <span>
                        Add a favorite download location
                    </span>
                </div>

                <button
                    type="button"
                    className="icon-button"
                    title="Close"
                    onClick={onClose}
                >
                    <AiOutlineClose size={16} />
                </button>
            </div>

            <div className="form-content">

                <label className="form-field">
                    <span>Name</span>

                    <input
                        value={name}
                        onChange={event =>
                            setName(event.target.value)
                        }
                        placeholder="Movies"
                        autoFocus
                    />
                </label>

                <label className="form-field">
                    <span>Path</span>

                    <input
                        value={path}
                        onChange={event =>
                            setPath(event.target.value)
                        }
                        placeholder="/Public/movies"
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
                    Cancel
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
                        ? 'Adding...'
                        : 'Add location'}
                </button>
            </div>
        </form>
    )
}
