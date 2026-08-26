# qBittorrent Companion

A lightweight Chrome extension for managing your **qBittorrent** downloads directly from the browser.

## Add torrents directly from the browser

The extension adds a **context menu for magnet links**.

Just right-click a magnet link on any webpage and select **Add to qBittorrent** — the torrent will be sent directly to your qBittorrent server without opening the qBittorrent WebUI.

## Features

* 📊 View torrent progress, download and upload speeds
* ⏯️ Start, pause and manage torrents
* 📁 Quickly select favorite download locations
* 🖥️ Support for multiple qBittorrent servers
* 🌙 Automatic dark mode

## qBittorrent Configuration

For the extension to communicate with qBittorrent, CSRF protection must be disabled in the qBittorrent Web UI.

Open Settings → Web UI → Security and disable Enable Cross-Site Request Forgery (CSRF) protection.

## Installation

### Chrome Web Store

Install **qBittorrent Companion** directly from the [Chrome Web Store](https://chromewebstore.google.com/detail/qbittorrent-companion/nbiblonadlnpahcbpaebekcencokabol).

### Build locally

Requirements:

* Node.js >= v22.13.0

Build the extension:

```bash
npm run build
```

## Requirements

* Google Chrome or another Chromium-based browser
* qBittorrent with Web UI enabled

## License

MIT
