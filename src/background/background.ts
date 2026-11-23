import { browserApi } from "../api/browserApi"
import { getLanguage } from "../storage/languageStore"
import {
    detectSystemLanguage,
    resolveLanguage,
    translate
} from "../i18n/i18n"

const ADD_MAGNET = 'add-magnet'

async function getMenuTitle(): Promise<string> {
    const [language, systemLanguage] = await Promise.all([
        getLanguage(),
        detectSystemLanguage()
    ])

    return translate(
        resolveLanguage(language, systemLanguage),
        'add_to_qbittorrent'
    )
}

async function updateMenuTitle(): Promise<void> {
    const title = await getMenuTitle()

    try {
        await browserApi.contextMenus.update(ADD_MAGNET, { title })
    } catch {
        // the menu item has not been created yet
    }
}

browserApi.runtime.onInstalled.addListener(async () => {
    browserApi.contextMenus.create({
        id: ADD_MAGNET,
        title: await getMenuTitle(),
        contexts: ['link']
    })
})

browserApi.storage.local.onChanged.addListener(changes => {
    if ('language' in changes) {
        updateMenuTitle()
    }
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