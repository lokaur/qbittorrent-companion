const ADD_MAGNET = 'add-magnet'

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: ADD_MAGNET,
        title: 'Add to QBittorrent',
        contexts: ['link']
    })
})

chrome.contextMenus.onClicked.addListener(
    async (info) => {
        if (info.menuItemId === ADD_MAGNET && info.linkUrl) {
            const url = new URL(chrome.runtime.getURL('add-torrent.html'))
            url.searchParams.set('magnet', info.linkUrl)
            chrome.tabs.create({
                url: url.toString()
            })
        }
    }
)
