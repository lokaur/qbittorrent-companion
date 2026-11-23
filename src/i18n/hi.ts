export const hi: Record<string, string | string[]> = {
    loading: 'लोड हो रहा है...',
    close: 'बंद करें',
    cancel: 'रद्द करें',

    settings: 'सेटिंग्स',
    settings_subtitle: 'सर्वर, डाउनलोड स्थान और भाषा प्रबंधित करें',

    servers: 'सर्वर',
    servers_subtitle: 'अपने सर्वर प्रबंधित करें',
    add_server: 'सर्वर जोड़ें',
    add_server_subtitle: 'qBittorrent सर्वर जोड़ें',
    active: 'सक्रिय',
    delete_server: 'सर्वर हटाएँ',
    no_servers: 'कोई सर्वर नहीं जोड़ा गया',

    favorite_locations: 'पसंदीदा स्थान',
    favorite_locations_subtitle: 'तेज़ी से डाउनलोड स्थान चुनें',
    add_location: 'स्थान जोड़ें',
    add_location_subtitle: 'पसंदीदा डाउनलोड स्थान जोड़ें',
    no_locations: 'अभी कोई पसंदीदा स्थान नहीं है',
    delete_location: 'स्थान हटाएँ',

    language: 'भाषा',
    language_subtitle: 'इंटरफ़ेस की भाषा चुनें',
    language_system: 'सिस्टम की भाषा',
    language_en: 'English',
    language_ru: 'Русский',
    language_es: 'Español',
    language_hi: 'हिन्दी',

    name: 'नाम',
    server_name_placeholder: 'सर्वर का नाम',
    url: 'URL',
    username: 'उपयोगकर्ता नाम',
    password: 'पासवर्ड',
    show_password: 'पासवर्ड दिखाएँ',
    connecting: 'कनेक्ट हो रहा है...',
    access_denied: 'सर्वर {url} तक पहुँच नहीं है',
    failed_to_connect: 'कनेक्ट नहीं हो सका',

    path: 'पथ',
    location_name_placeholder: 'फ़िल्में',
    location_path_placeholder: '/Public/movies',
    adding: 'जोड़ा जा रहा है...',

    add_torrent: 'टॉरेंट जोड़ें',
    add_torrent_subtitle: 'टॉरेंट फ़ाइल या मैग्नेट लिंक जोड़ें',
    server: 'सर्वर',
    magnet_link: 'मैग्नेट लिंक',
    torrent_file: 'टॉरेंट फ़ाइल',
    magnet_placeholder: 'यहाँ मैग्नेट लिंक पेस्ट करें...',
    choose_torrent_file: 'टॉरेंट फ़ाइल चुनें',
    download_location: 'डाउनलोड स्थान',
    default_location: 'qBittorrent का तय स्थान',
    custom_path: 'अपना पथ...',
    custom_path_label: 'अपना पथ',
    custom_path_placeholder: '/Public/Downloads',
    save_as_favorite: 'पसंदीदा डाउनलोड स्थान के रूप में सहेजें',
    location_name: 'स्थान का नाम',
    adding_torrent: 'टॉरेंट जोड़ा जा रहा है...',

    server_not_selected: 'सर्वर चुना नहीं गया',
    enter_magnet: 'कृपया मैग्नेट लिंक दर्ज करें',
    select_torrent_file: 'कृपया टॉरेंट फ़ाइल चुनें',
    enter_download_path: 'डाउनलोड पथ दर्ज करें',
    enter_location_name: 'स्थान का नाम दर्ज करें',
    failed_to_add_torrent: 'टॉरेंट जोड़ने में असमर्थ',

    error_with_message: 'त्रुटि: {message}',
    no_torrents: 'कोई टॉरेंट नहीं मिला',
    search_placeholder: 'टॉरेंट खोजें...',
    clear_input: 'साफ़ करें',

    delete: 'हटाएँ',
    deleting: 'हटाया जा रहा है...',
    delete_torrents_title: [
        'टॉरेंट हटाएँ?',
        '{count} टॉरेंट हटाएँ?'
    ],
    delete_torrents_description: [
        'चुना गया टॉरेंट qBittorrent से हटा दिया जाएगा',
        'चुने गए टॉरेंट qBittorrent से हटा दिए जाएँगे'
    ],
    delete_files: 'टॉरेंट फ़ाइलें और डेटा हटाएँ',
    failed_to_delete: 'टॉरेंट हटाने में असमर्थ',

    filter_all: 'सभी',
    filter_downloading: 'डाउनलोड हो रहे',
    filter_seeding: 'सीडिंग',
    filter_stopped: 'रुके हुए',
    filter_active: 'सक्रिय',
    filter_checking: 'जाँच हो रही है',
    filter_errored: 'त्रुटि वाली',

    selected_count: [
        '{count} चुना गया',
        '{count} चुने गए'
    ],
    clear_selected: 'चयन साफ़ करें',

    total_speed: 'कुल गति:',
    toggle_speed: 'वैकल्पिक गति मोड बदलें',

    start: 'शुरू करें',
    stop: 'रोकें',

    theme_label: 'थीम: {theme}',
    theme_system: 'सिस्टम',
    theme_light: 'लाइट',
    theme_dark: 'डार्क',

    csrf_warning: 'qBittorrent WebUI में CSRF सुरक्षा अक्षम करें:',
    csrf_warning_path: 'सेटिंग्स → Web UI → सुरक्षा',
    csrf_warning_option: '«Enable Cross-Site Request Forgery (CSRF)» अक्षम करें',

    add_to_qbittorrent: 'qBittorrent में जोड़ें',

    no_server_selected: 'कोई सर्वर नहीं चुना गया',
    no_active_server: 'कोई सक्रिय सर्वर नहीं चुना गया'
}
