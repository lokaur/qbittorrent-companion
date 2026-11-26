export const ru: Record<string, string | string[]> = {
    loading: 'Загрузка...',
    close: 'Закрыть',
    cancel: 'Отмена',

    settings: 'Настройки',
    settings_subtitle: 'Управление серверами, папками загрузки и языком',

    servers: 'Серверы',
    servers_subtitle: 'Управление вашими серверами',
    add_server: 'Добавить сервер',
    add_server_subtitle: 'Добавить сервер qBittorrent',
    active: 'Активен',
    delete_server: 'Удалить сервер',
    no_servers: 'Серверы не добавлены',

    favorite_locations: 'Избранные папки',
    favorite_locations_subtitle: 'Быстрый выбор папки для загрузки',
    add_location: 'Добавить папку',
    add_location_subtitle: 'Добавить избранную папку для загрузки',
    no_locations: 'Избранных папок пока нет',
    delete_location: 'Удалить папку',

    language: 'Язык',
    language_subtitle: 'Выберите язык интерфейса расширения',
    language_system: 'Как в системе',
    language_en: 'English',
    language_ru: 'Русский',
    language_es: 'Español',
    language_hi: 'Хинди',

    name: 'Название',
    server_name_placeholder: 'Название сервера',
    url: 'URL',
    username: 'Имя пользователя',
    password: 'Пароль',
    show_password: 'Показать пароль',
    connecting: 'Подключение...',
    access_denied: 'Нет доступа к серверу {url}',
    failed_to_connect: 'Не удалось подключиться',

    path: 'Путь',
    location_name_placeholder: 'Фильмы',
    location_path_placeholder: '/Public/movies',
    adding: 'Добавление...',

    add_torrent: 'Добавить торрент',
    add_torrent_subtitle: 'Добавить файл торрента или magnet-ссылку',
    server: 'Сервер',
    magnet_link: 'Magnet-ссылка',
    torrent_file: 'Файл торрента',
    magnet_placeholder: 'Вставьте magnet-ссылку...',
    choose_torrent_file: 'Выберите файл торрента',
    download_location: 'Папка для загрузки',
    default_location: 'Стандартная папка qBittorrent',
    custom_path: 'Свой путь...',
    custom_path_label: 'Свой путь',
    custom_path_placeholder: '/Public/Downloads',
    save_as_favorite: 'Сохранить как избранную папку для загрузки',
    location_name: 'Название папки',
    adding_torrent: 'Добавление торрента...',

    server_not_selected: 'Сервер не выбран',
    enter_magnet: 'Введите magnet-ссылку',
    select_torrent_file: 'Выберите файл торрента',
    enter_download_path: 'Укажите путь для загрузки',
    enter_location_name: 'Укажите название папки',
    failed_to_add_torrent: 'Не удалось добавить торрент',

    error_with_message: 'Ошибка: {message}',
    no_torrents: 'Торренты не найдены',
    search_placeholder: 'Поиск торрентов...',
    clear_input: 'Очистить',

    delete: 'Удалить',
    deleting: 'Удаление...',
    delete_torrents_title: [
        'Удалить торрент?',
        'Удалить {count} торрента?',
        'Удалить {count} торрентов?'
    ],
    delete_torrents_description: [
        'Выбранный торрент будет удалён из qBittorrent',
        'Выбранные торренты будут удалены из qBittorrent'
    ],
    delete_files: 'Удалить файлы и данные торрента',
    failed_to_delete: 'Не удалось удалить торрент',

    filter_all: 'Все',
    filter_downloading: 'Загрузка',
    filter_seeding: 'Раздача',
    filter_stopped: 'Остановленные',
    filter_active: 'Активные',
    filter_checking: 'Проверка',
    filter_errored: 'Ошибки',

    selected_count: [
        '{count} выбран',
        '{count} выбрано',
        '{count} выбрано'
    ],
    clear_selected: 'Снять выбор',

    toggle_speed: 'Переключить альтернативный режим скорости',

    column_name: 'Название',
    column_size: 'Размер',
    column_progress: 'Прогресс',
    column_download: 'Загрузка',
    column_upload: 'Раздача',
    resize_column: 'Перетащите, чтобы изменить ширину колонки',
    sort_by_column: 'Сортировать по «{column}»',

    status_upload_speed: 'Скорость отдачи',
    status_download_speed: 'Скорость загрузки',
    status_connection_connected: 'Подключено',
    status_connection_firewalled: 'Заблокировано firewall',
    status_connection_disconnected: 'Отключено',
    free_space: 'Свободно: {size}',
    status_free_space_unknown: 'Свободное место: неизвестно',
    status_free_space_hint: 'Свободное место на пути загрузки по умолчанию',

    start: 'Запустить',
    stop: 'Остановить',

    theme_label: 'Тема: {theme}',
    theme_system: 'Системная',
    theme_light: 'Светлая',
    theme_dark: 'Тёмная',

    csrf_warning: 'Отключите защиту CSRF в веб-интерфейсе qBittorrent:',
    csrf_warning_path: 'Настройки → Web UI → Безопасность',
    csrf_warning_option: 'Отключите «Включить защиту от межсайтовых запросов (CSRF)»',

    add_to_qbittorrent: 'Добавить в qBittorrent',

    no_server_selected: 'Сервер не выбран',
    no_active_server: 'Активный сервер не выбран'
}
