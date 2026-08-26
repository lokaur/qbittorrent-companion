import { useEffect, useState } from "react";
import type { Theme } from "../models/Theme";
import { getTheme, setTheme } from "../storage/themeStore";

type ResolvedTheme = 'light' | 'dark'

function getSystemTheme(): ResolvedTheme {
    return window.matchMedia(
        '(prefers-color-scheme: dark)'
    ).matches
        ? 'dark'
        : 'light'
}

export function useTheme() {
    const [theme, setThemeState] = useState<Theme>()
    const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(getSystemTheme())

    useEffect(() => {
        getTheme().then(theme => {
            setThemeState(theme)
            setResolvedTheme(theme === 'system' ? getSystemTheme() : theme)
        })
    }, [])

    useEffect(() => {
        if (theme != 'system') {
            return
        }

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = () => {
            setResolvedTheme(
                mediaQuery.matches
                    ? 'dark'
                    : 'light'
            )
        }

        mediaQuery.addEventListener('change', handleChange)

        return () => {
            mediaQuery.removeEventListener('change', handleChange)
        }
    }, [theme])

    async function changeTheme(newTheme: Theme): Promise<void> {
        await setTheme(newTheme)
        setThemeState(newTheme)
        setResolvedTheme(newTheme === 'system'
            ? getSystemTheme()
            : newTheme
        )
    }

    return {
        theme,
        resolvedTheme,
        changeTheme
    }
}
