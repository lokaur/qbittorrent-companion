export const es: Record<string, string | string[]> = {
    loading: 'Cargando...',
    close: 'Cerrar',
    cancel: 'Cancelar',

    settings: 'Configuración',
    settings_subtitle: 'Gestiona servidores, ubicaciones de descarga e idioma',

    servers: 'Servidores',
    servers_subtitle: 'Gestiona tus servidores',
    add_server: 'Añadir servidor',
    add_server_subtitle: 'Añadir servidor qBittorrent',
    active: 'Activo',
    delete_server: 'Eliminar servidor',
    no_servers: 'No se han añadido servidores',

    favorite_locations: 'Ubicaciones favoritas',
    favorite_locations_subtitle: 'Selecciona rápidamente una ubicación de descarga',
    add_location: 'Añadir ubicación',
    add_location_subtitle: 'Añadir una ubicación de descarga favorita',
    no_locations: 'Aún no hay ubicaciones favoritas',
    delete_location: 'Eliminar ubicación',

    language: 'Idioma',
    language_subtitle: 'Elige el idioma de la interfaz',
    language_system: 'Predeterminado del sistema',
    language_en: 'English',
    language_ru: 'Русский',
    language_es: 'Español',
    language_hi: 'Hindi',

    name: 'Nombre',
    server_name_placeholder: 'Nombre del servidor',
    url: 'URL',
    username: 'Usuario',
    password: 'Contraseña',
    show_password: 'Mostrar contraseña',
    connecting: 'Conectando...',
    access_denied: 'Acceso denegado al servidor {url}',
    failed_to_connect: 'No se pudo conectar',

    path: 'Ruta',
    location_name_placeholder: 'Películas',
    location_path_placeholder: '/Public/movies',
    adding: 'Añadiendo...',

    add_torrent: 'Añadir torrent',
    add_torrent_subtitle: 'Añadir un archivo torrent o un enlace magnet',
    server: 'Servidor',
    magnet_link: 'Enlace magnet',
    torrent_file: 'Archivo torrent',
    magnet_placeholder: 'Pega aquí el enlace magnet...',
    choose_torrent_file: 'Elegir archivo torrent',
    download_location: 'Ubicación de descarga',
    default_location: 'Ubicación predeterminada de qBittorrent',
    custom_path: 'Ruta personalizada...',
    custom_path_label: 'Ruta personalizada',
    custom_path_placeholder: '/Public/Downloads',
    save_as_favorite: 'Guardar como ubicación de descarga favorita',
    location_name: 'Nombre de la ubicación',
    adding_torrent: 'Añadiendo torrent...',

    server_not_selected: 'No se ha seleccionado un servidor',
    enter_magnet: 'Introduce un enlace magnet',
    select_torrent_file: 'Selecciona un archivo torrent',
    enter_download_path: 'Introduce la ruta de descarga',
    enter_location_name: 'Introduce el nombre de la ubicación',
    failed_to_add_torrent: 'No se pudo añadir el torrent',

    error_with_message: 'Error: {message}',
    no_torrents: 'No se encontraron torrents',
    search_placeholder: 'Buscar torrents...',
    clear_input: 'Limpiar',

    delete: 'Eliminar',
    deleting: 'Eliminando...',
    delete_torrents_title: [
        '¿Eliminar torrent?',
        '¿Eliminar {count} torrents?'
    ],
    delete_torrents_description: [
        'El torrent seleccionado se eliminará de qBittorrent',
        'Los torrents seleccionados se eliminarán de qBittorrent'
    ],
    delete_files: 'Eliminar archivos y datos del torrent',
    failed_to_delete: 'No se pudo eliminar el torrent',

    filter_all: 'Todos',
    filter_downloading: 'Descargando',
    filter_seeding: 'Compartiendo',
    filter_stopped: 'Detenidos',
    filter_active: 'Activos',
    filter_checking: 'Comprobando',
    filter_errored: 'Con errores',

    selected_count: [
        '{count} seleccionado',
        '{count} seleccionados'
    ],
    clear_selected: 'Deseleccionar',

    toggle_speed: 'Cambiar el modo de velocidad alternativo',

    column_name: 'Nombre',
    column_size: 'Tamaño',
    column_progress: 'Progreso',
    column_download: 'Descargando',
    column_upload: 'Compartiendo',
    resize_column: 'Arrastra para cambiar el ancho de la columna',
    sort_by_column: 'Ordenar por {column}',

    status_upload_speed: 'Velocidad de subida',
    status_download_speed: 'Velocidad de descarga',
    status_connection_connected: 'Conectado',
    status_connection_firewalled: 'Bloqueado por firewall',
    status_connection_disconnected: 'Desconectado',
    free_space: 'Espacio libre: {size}',
    status_free_space_unknown: 'Espacio libre: desconocido',
    status_free_space_hint: 'Espacio libre en la ruta de descarga predeterminada',

    start: 'Iniciar',
    stop: 'Detener',

    theme_label: 'Tema: {theme}',
    theme_system: 'Sistema',
    theme_light: 'Claro',
    theme_dark: 'Oscuro',

    csrf_warning: 'Desactiva la protección CSRF en la WebUI de qBittorrent:',
    csrf_warning_path: 'Configuración → Web UI → Seguridad',
    csrf_warning_option: 'Desactiva «Activar protección contra falsificación de solicitudes entre sitios (CSRF)»',

    add_to_qbittorrent: 'Añadir a qBittorrent',

    no_server_selected: 'No se ha seleccionado un servidor',
    no_active_server: 'No hay un servidor activo seleccionado'
}
