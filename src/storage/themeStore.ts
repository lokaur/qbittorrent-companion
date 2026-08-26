import { isExtension, setValue } from "../helpers/extensionHelper";
import type { Theme } from "../models/Theme";

const THEME_KEY = 'theme'

export async function getTheme(): Promise<Theme> {
    if (isExtension()) {
        const result = await chrome.storage.local.get(THEME_KEY)
        return (result[THEME_KEY] as Theme) ?? 'system'
    }
    const result = localStorage.getItem(THEME_KEY)
    return result as Theme ?? 'system'
}

export async function setTheme(theme: Theme): Promise<void> {
    await setValue(THEME_KEY, theme)
}
