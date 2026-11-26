export const en: Record<string, string | string[]> = {
    loading: 'Loading...',
    close: 'Close',
    cancel: 'Cancel',

    settings: 'Settings',
    settings_subtitle: 'Manage servers, download locations and language',

    servers: 'Servers',
    servers_subtitle: 'Manage your servers',
    add_server: 'Add server',
    add_server_subtitle: 'Add qBittorrent server',
    active: 'Active',
    delete_server: 'Delete server',
    no_servers: 'No servers added',

    favorite_locations: 'Favorite locations',
    favorite_locations_subtitle: 'Quickly select a download location',
    add_location: 'Add location',
    add_location_subtitle: 'Add a favorite download location',
    no_locations: 'No favorite locations yet',
    delete_location: 'Delete location',

    language: 'Language',
    language_subtitle: 'Choose the extension interface language',
    language_system: 'System default',
    language_en: 'English',
    language_ru: 'Русский',
    language_es: 'Español',
    language_hi: 'Hindi',

    name: 'Name',
    server_name_placeholder: 'Server name',
    url: 'URL',
    username: 'Username',
    password: 'Password',
    show_password: 'Show password',
    connecting: 'Connecting...',
    access_denied: 'Access denied to server {url}',
    failed_to_connect: 'Failed to connect',

    path: 'Path',
    location_name_placeholder: 'Movies',
    location_path_placeholder: '/Public/movies',
    adding: 'Adding...',

    add_torrent: 'Add torrent',
    add_torrent_subtitle: 'Add torrent file or magnet link',
    server: 'Server',
    magnet_link: 'Magnet link',
    torrent_file: 'Torrent file',
    magnet_placeholder: 'Paste magnet link here...',
    choose_torrent_file: 'Choose torrent file',
    download_location: 'Download location',
    default_location: 'Default qBittorrent location',
    custom_path: 'Custom path...',
    custom_path_label: 'Custom path',
    custom_path_placeholder: '/Public/Downloads',
    save_as_favorite: 'Save as favorite download location',
    location_name: 'Location name',
    adding_torrent: 'Adding torrent...',

    server_not_selected: 'Server not selected',
    enter_magnet: 'Please enter a magnet link',
    select_torrent_file: 'Please select a torrent file',
    enter_download_path: 'Enter download path',
    enter_location_name: 'Enter location name',
    failed_to_add_torrent: 'Failed to add torrent',

    error_with_message: 'Error: {message}',
    no_torrents: 'No torrents found',
    search_placeholder: 'Search torrents...',
    clear_input: 'Clear input',

    delete: 'Delete',
    deleting: 'Deleting...',
    delete_torrents_title: [
        'Delete torrent?',
        'Delete {count} torrents?'
    ],
    delete_torrents_description: [
        'The selected torrent will be removed from qBittorrent',
        'The selected torrents will be removed from qBittorrent'
    ],
    delete_files: 'Delete torrent files and data',
    failed_to_delete: 'Failed to delete torrent',

    filter_all: 'All',
    filter_downloading: 'Downloading',
    filter_seeding: 'Seeding',
    filter_stopped: 'Stopped',
    filter_active: 'Active',
    filter_checking: 'Checking',
    filter_errored: 'Errored',

    selected_count: [
        '{count} selected',
        '{count} selected'
    ],
    clear_selected: 'Clear selected',

    toggle_speed: 'Toggle alternative speed mode',

    column_name: 'Name',
    column_size: 'Size',
    column_progress: 'Progress',
    column_download: 'Downloading',
    column_upload: 'Seeding',
    resize_column: 'Drag to resize column',
    sort_by_column: 'Sort by {column}',

    status_upload_speed: 'Upload speed',
    status_download_speed: 'Download speed',
    status_connection_connected: 'Connected',
    status_connection_firewalled: 'Firewalled',
    status_connection_disconnected: 'Disconnected',
    free_space: 'Free space: {size}',
    status_free_space_unknown: 'Free space: unknown',
    status_free_space_hint: 'Free space on the default download path',

    start: 'Start',
    stop: 'Stop',

    theme_label: 'Theme: {theme}',
    theme_system: 'System',
    theme_light: 'Light',
    theme_dark: 'Dark',

    csrf_warning: 'Disable CSRF protection in the qBittorrent WebUI:',
    csrf_warning_path: 'Settings → Web UI → Security',
    csrf_warning_option: 'Disable «Enable Cross-Site Request Forgery (CSRF)»',

    add_to_qbittorrent: 'Add to qBittorrent',

    no_server_selected: 'No server selected',
    no_active_server: 'No active server selected'
}
