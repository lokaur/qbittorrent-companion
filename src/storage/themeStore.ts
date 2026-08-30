import { browserApi } from "../api/browserApi";
import type { Theme } from "../models/Theme";

const THEME_KEY = 'theme'

export async function getTheme(): Promise<Theme> {
    const result = await browserApi.storage.local.get(THEME_KEY)
    return (result[THEME_KEY] as Theme) ?? 'system'
}

export async function setTheme(theme: Theme): Promise<void> {
    await browserApi.storage.local.set({
        [THEME_KEY]: theme
    })
}
