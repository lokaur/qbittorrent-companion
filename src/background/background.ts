import { browserApi } from "../api/browserApi"

const ADD_MAGNET = 'add-magnet'

browserApi.runtime.onInstalled.addListener(() => {
    browserApi.contextMenus.create({
        id: ADD_MAGNET,
        title: 'Add to QBittorrent',
        contexts: ['link']
    })
})

browserApi.contextMenus.onClicked.addListener(
    async (info) => {
        if (info.menuItemId === ADD_MAGNET && info.linkUrl) {
            const url = new URL(browserApi.runtime.getURL('add-torrent.html'))
            url.searchParams.set('magnet', info.linkUrl)
            browserApi.tabs.create({
                url: url.toString()
            })
        }
    }
)
