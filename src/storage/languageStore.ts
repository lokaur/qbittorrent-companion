import { browserApi } from "../api/browserApi"
import type { Language } from "../models/Language"

const LANGUAGE_KEY = 'language'

export async function getLanguage(): Promise<Language> {
    const result = await browserApi.storage.local.get(LANGUAGE_KEY)
    const stored = result[LANGUAGE_KEY] as Language | undefined

    return stored ?? 'system'
}

export async function setLanguage(language: Language): Promise<void> {
    await browserApi.storage.local.set({
        [LANGUAGE_KEY]: language
    })
}
