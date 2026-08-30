import { useState, type HTMLInputTypeAttribute } from "react"
import type { QBittorrentServer } from "../../models/QBittorrentServer"
import { QBittorrentClient } from "../../api/QBittorrentClient"
import { clearPendingServer, setPendingServer } from "../../storage/serverStore"
import { isExtension } from "../../helpers/extensionHelper"
import { AiOutlineClose, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { browserApi, isFirefox } from "../../api/browserApi"

interface AddServerFormProps {
    onCancel: () => void
    onClose: () => void
    onAdd: (server: QBittorrentServer) => Promise<void>
}

export function AddServerForm({
    onCancel,
    onClose,
    onAdd
}: AddServerFormProps) {
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordState, setPasswordState] = useState<HTMLInputTypeAttribute>('password')

    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(
        event: React.SubmitEvent
    ) {
        event.preventDefault()

        setError(null)
        setSaving(true)

        try {
            const serverUrl = url.trim()
            const server: QBittorrentServer = {
                id: crypto.randomUUID(),
                name: name.trim(),
                url: serverUrl,
                username,
                password
            }

            if (isExtension) {
                let granted = false
                if (!isFirefox) {
                    await setPendingServer(server)
                }
                granted = await browserApi.permissions.request({
                    origins: [`${new URL(serverUrl).origin}/*`]
                })
                if (isFirefox) {
                    await setPendingServer(server)
                }

                if (!granted) {
                    await clearPendingServer()
                    throw new Error(`Access denied to server ${serverUrl}`)
                }
            }

            const client = new QBittorrentClient(server)
            await client.testConnection()
            await clearPendingServer()
            await onAdd(server)
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to connect'
            )
        } finally {
            setSaving(false)
        }
    }

    function togglePasswordVisibility() {
        setPasswordState(passwordState === 'password' ? 'text' : 'password')
    }

    return (
        <form
            className="add-server-form"
            onSubmit={handleSubmit}>
            <div className="settings-header">
                <div>
                    <h2>Add server</h2>

                    <span>
                        Add qBittorrent server
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
                <div className="form-field">
                    <span>Name</span>

                    <input
                        value={name}
                        onChange={event => setName(event.target.value)}
                        placeholder="Server name"
                        required
                        autoFocus
                    />
                </div>

                <div className="form-field">
                    <span>URL</span>

                    <input
                        value={url}
                        onChange={event => setUrl(event.target.value)}
                        placeholder="http://qbittorrent:9865"
                        required
                    />
                </div>

                <div className="form-field">
                    <span>Username</span>

                    <input
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                        required
                    />
                </div>

                <div className="form-field">
                    <span>Password</span>

                    <div className="input-with-side-btn">
                        <input
                            type={passwordState}
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            required
                        />

                        <button
                            className="input-side-btn"
                            onClick={togglePasswordVisibility}
                            type="button"
                            aria-label="Show password"
                        >
                            {passwordState === 'password'
                                ? (<AiOutlineEyeInvisible className="input-side-btn-icon" size={14} />)
                                : (<AiOutlineEye className="input-side-btn-icon" size={14} />)}
                        </button>
                    </div>
                </div>

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
            </div>

            <div className="form-actions">
                <button
                    type="button"
                    className="secondary-button"
                    onClick={onCancel}
                    disabled={saving}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="primary-button"
                    disabled={
                        saving ||
                        !name.trim() ||
                        !password.trim() ||
                        !url.trim()
                    }
                >
                    {saving
                        ? 'Connecting...'
                        : 'Add server'}
                </button>
            </div>
        </form>
    )
}
