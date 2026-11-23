import { useState } from "react"
import type { QBittorrentServer } from "../../models/QBittorrentServer"
import { AddServerForm } from "./AddServerForm"
import './styles/Settings.css'
import type { FavoriteLocation } from "../../models/FavoriteLocation"
import { AddFavoriteLocationForm } from "./AddFavoriteLocationForm"
import { FcAddDatabase, FcAddRow, FcExpand, FcFullTrash, FcOpenedFolder } from "react-icons/fc"
import { AiOutlineClose } from "react-icons/ai"
import { getSystemLanguage, t } from "../../i18n/i18n"
import type { Language } from "../../models/Language"

export type SettingsMode =
    | 'main'
    | 'add-server'
    | 'add-location'

interface SettingsProps {
    mode: SettingsMode
    servers: QBittorrentServer[]
    activeServer: QBittorrentServer | null
    locations: FavoriteLocation[]
    language: Language
    onCreateServer: (server: QBittorrentServer) => Promise<void>
    onDeleteServer: (serverId: string) => Promise<void>
    onSelectServer: (server: QBittorrentServer) => Promise<void>
    onCreateLocation: (location: FavoriteLocation) => Promise<void>
    onDeleteLocation: (locationId: string) => Promise<void>
    onLanguageChange: (language: Language) => Promise<void>
    onClose: () => void
}

export function Settings({
    mode,
    servers,
    activeServer,
    locations,
    language,
    onCreateServer,
    onDeleteServer,
    onSelectServer,
    onCreateLocation,
    onDeleteLocation,
    onLanguageChange,
    onClose
}: SettingsProps) {
    const [showAddServer, setShowAddServer] = useState(mode === 'add-server')
    const [showAddLocation, setShowAddLocation] = useState(mode === 'add-location')

    const filteredLocations = locations.filter(location => location.serverId === activeServer?.id)

    function handleCloseForm(settingsMode: SettingsMode) {
        if (mode === settingsMode) {
            onClose()
        } else {
            switch (settingsMode) {
                case 'add-server':
                    setShowAddServer(false)
                    break
                case 'add-location':
                    setShowAddLocation(false)
                    break
            }
        }
    }

    if (showAddServer) {
        return (
            <AddServerForm
                onClose={onClose}
                onCancel={() =>
                    handleCloseForm('add-server')
                }
                onAdd={async server => {
                    await onCreateServer(server)
                    handleCloseForm('add-server')
                }}
            />
        )
    }

    if (showAddLocation) {
        return (
            <AddFavoriteLocationForm
                activeServer={activeServer}
                onClose={onClose}
                onCancel={() => {
                    handleCloseForm('add-location')
                }}
                onAdd={async location => {
                    await onCreateLocation(location)
                    handleCloseForm('add-location')
                }}
            />
        )
    }

    return (
        <div className="settings-view">
            <div className="settings-header">
                <div>
                    <h2>{t('settings')}</h2>
                    <span>
                        {t('settings_subtitle')}
                    </span>
                </div>

                <button
                    className="icon-button"
                    title={t('close')}
                    onClick={onClose}
                >
                    <AiOutlineClose size={16} />
                </button>
            </div>

            <div className="settings-content">
                <section className="settings-section">
                    <div className="settings-section-header">
                        <div>
                            <h3>{t('language')}</h3>
                            <p>
                                {t('language_subtitle')}
                            </p>
                        </div>
                    </div>

                    <div className="form-field">
                        <div className="select-wrapper">
                            <select
                                value={language}
                                onChange={event =>
                                    onLanguageChange(
                                        event.target.value as Language
                                    )
                                }
                            >
                                <option value="system">
                                    {t('language_system')}
                                    {' '}
                                    ({t(`language_${getSystemLanguage()}`)})
                                </option>
                                <option value="en">
                                    {t('language_en')}
                                </option>
                                <option value="ru">
                                    {t('language_ru')}
                                </option>
                                <option value="es">
                                    {t('language_es')}
                                </option>
                                <option value="hi">
                                    {t('language_hi')}
                                </option>
                            </select>

                            <span className="select-arrow">
                                <FcExpand />
                            </span>
                        </div>
                    </div>
                </section>

                <section className="settings-section">
                    <div className="settings-section-header">
                        <div>
                            <h3>{t('servers')}</h3>
                            <p>
                                {t('servers_subtitle')}
                            </p>
                        </div>

                        <button
                            className="secondary-button"
                            onClick={() => setShowAddServer(true)}>
                            <FcAddDatabase size={16} />
                            <span>{t('add_server')}</span>
                        </button>
                    </div>

                    <div className="settings-list">
                        {servers.map(server => {
                            const isActive = server.id === activeServer?.id
                            return (
                                <div
                                    key={server.id}
                                    className={`settings-card ${isActive ? 'active' : ''}`}
                                >
                                    <button
                                        className="server-info"
                                        onClick={() => onSelectServer(server)}>
                                        <div className="server-name-row">
                                            <span className="server-status" />
                                            <span className="server-name">{server.name}</span>
                                            {isActive && (
                                <span className="active-badge">
                                    {t('active')}
                                </span>
                                            )}
                                            <span className="server-url">{server.url}</span>
                                        </div>
                                    </button>

                                    <button
                                        className="delete-button"
                                        title={t('delete_server')}
                                        onClick={() => onDeleteServer(server.id)}
                                    >
                                        <FcFullTrash size={16} />
                                    </button>
                                </div>
                            )
                        })}
                    </div>

                    {servers.length === 0 && (
                        <div className="empty-state">
                            {t('no_servers')}
                        </div>
                    )}
                </section>

                <section className="settings-section">

                    <div className="settings-section-header">
                        <div>
                            <h3>{t('favorite_locations')}</h3>

                            <p>
                                {t('favorite_locations_subtitle')}
                            </p>
                        </div>

                        <button
                            className="secondary-button"
                            onClick={() =>
                                setShowAddLocation(true)
                            }
                            disabled={servers.length === 0}
                        >
                            <FcAddRow size={16} />
                            <span>{t('add_location')}</span>
                        </button>
                    </div>

                    {filteredLocations.length === 0 ? (
                        <div className="empty-state">
                            {t('no_locations')}
                        </div>
                    ) : (
                        <div className="settings-list">
                            {filteredLocations.map(location => (
                                <div
                                    key={location.id}
                                    className="settings-card location-card"
                                >
                                    <div className="location-info">
                                        <div className="location-name-row">
                                            <span className="location-icon">
                                                <FcOpenedFolder />
                                            </span>

                                            <span className="location-name">
                                                {location.name}
                                            </span>
                                        </div>

                                        <span className="location-path">
                                            {location.path}
                                        </span>

                                    </div>

                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            onDeleteLocation(location.id)
                                        }
                                        title={t('delete_location')}
                                    >
                                        <FcFullTrash size={16} />
                                    </button>
                                </div>
                            )
                            )}
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}