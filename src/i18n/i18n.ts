import type { Language, ResolvedLanguage } from '../models/Language'
import { browserApi } from '../api/browserApi'
import { en } from './en'
import { ru } from './ru'
import { es } from './es'
import { hi } from './hi'

type Message = string | string[]

const dictionaries: Record<ResolvedLanguage, Record<string, Message>> = {
    en,
    ru,
    es,
    hi
}

function matchLanguage(code: string): ResolvedLanguage | null {
    const normalized = code.toLowerCase().split('-')[0]

    if (normalized === 'ru') {
        return 'ru'
    }

    if (normalized === 'es') {
        return 'es'
    }

    if (normalized === 'hi') {
        return 'hi'
    }

    return null
}

function detectSystemLanguageSync(): ResolvedLanguage {
    if (typeof navigator === 'undefined') {
        return 'en'
    }

    const candidates = navigator.languages ?? [navigator.language]

    for (const candidate of candidates) {
        const matched = matchLanguage(candidate)

        if (matched) {
            return matched
        }
    }

    return 'en'
}

export async function detectSystemLanguage(): Promise<ResolvedLanguage> {
    const detected = detectSystemLanguageSync()

    if (detected !== 'en') {
        return detected
    }

    // Some browsers report the extension UI locale instead of the
    // browser UI language, so fall back to the accept-language list.
    const i18n = (browserApi as {
        i18n?: {
            getAcceptLanguages?: () => Promise<string[]>
        }
    }).i18n

    if (i18n?.getAcceptLanguages) {
        try {
            const acceptLanguages = await i18n.getAcceptLanguages()

            for (const candidate of acceptLanguages) {
                const matched = matchLanguage(candidate)

                if (matched) {
                    return matched
                }
            }
        } catch {
            // ignore, keep the navigator based result
        }
    }

    return 'en'
}


export function resolveLanguage(
    language: Language,
    systemLanguage: ResolvedLanguage
): ResolvedLanguage {
    return language === 'system' ? systemLanguage : language
}

function pluralIndex(language: ResolvedLanguage, count: number): number {
    if (language !== 'ru') {
        return count === 1 ? 0 : 1
    }

    const mod10 = count % 10
    const mod100 = count % 100

    if (mod10 === 1 && mod100 !== 11) {
        return 0
    }

    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
        return 1
    }

    return 2
}

function interpolate(message: string, vars?: Record<string, string | number>): string {
    if (!vars) {
        return message
    }

    return message.replace(
        /\{(\w+)\}/g,
        (match, key: string) =>
            Object.prototype.hasOwnProperty.call(vars, key)
                ? String(vars[key])
                : match
    )
}

export function translate(
    language: ResolvedLanguage,
    key: string,
    vars?: Record<string, string | number>
): string {
    const message = dictionaries[language][key] ?? dictionaries.en[key]

    if (message == null) {
        return key
    }

    if (Array.isArray(message)) {
        const index = Math.min(
            pluralIndex(language, Number(vars?.count ?? 1)),
            message.length - 1
        )

        return interpolate(message[index], vars)
    }

    return interpolate(message, vars)
}

let systemLanguage: ResolvedLanguage = detectSystemLanguageSync()
let currentLanguage: ResolvedLanguage = systemLanguage
let storedLanguage: Language = 'system'

export function getSystemLanguage(): ResolvedLanguage {
    return systemLanguage
}

export function setSystemLanguage(language: ResolvedLanguage): void {
    systemLanguage = language
}

export function getStoredLanguage(): Language {
    return storedLanguage
}

export function setStoredLanguage(language: Language): void {
    storedLanguage = language
}

export function getResolvedLanguage(): ResolvedLanguage {
    return currentLanguage
}

export function setResolvedLanguage(language: ResolvedLanguage): void {
    currentLanguage = language

    if (typeof document !== 'undefined') {
        document.documentElement.lang = language
    }
}

export function t(
    key: string,
    vars?: Record<string, string | number>
): string {
    return translate(currentLanguage, key, vars)
}
