import { useEffect, useState } from "react"
import type { Language, ResolvedLanguage } from "../models/Language"
import { getLanguage, setLanguage } from "../storage/languageStore"
import {
    getResolvedLanguage,
    getStoredLanguage,
    getSystemLanguage,
    resolveLanguage,
    setResolvedLanguage,
    setStoredLanguage
} from "../i18n/i18n"

export function useLanguage() {
    const [language, setLanguageState] = useState<Language>(
        getStoredLanguage()
    )
    const [resolvedLanguage, setResolvedState] = useState<ResolvedLanguage>(
        getResolvedLanguage()
    )

    useEffect(() => {
        getLanguage().then(stored => {
            if (stored === getStoredLanguage()) {
                return
            }

            const resolved = resolveLanguage(stored, getSystemLanguage())

            setStoredLanguage(stored)
            setLanguageState(stored)
            setResolvedState(resolved)
            setResolvedLanguage(resolved)
        })
    }, [])

    async function changeLanguage(newLanguage: Language): Promise<void> {
        const resolved = resolveLanguage(newLanguage, getSystemLanguage())

        setStoredLanguage(newLanguage)
        setLanguageState(newLanguage)
        setResolvedState(resolved)
        setResolvedLanguage(resolved)

        await setLanguage(newLanguage)
    }

    return {
        language,
        resolvedLanguage,
        systemLanguage: getSystemLanguage(),
        changeLanguage
    }
}
