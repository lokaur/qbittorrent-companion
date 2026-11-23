import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AddTorrentPage } from "./components/pages/AddTorrentPage";
import './styles/global.css';
import { getLanguage } from "./storage/languageStore";
import {
    detectSystemLanguage,
    resolveLanguage,
    setResolvedLanguage,
    setStoredLanguage,
    setSystemLanguage
} from "./i18n/i18n";

async function bootstrap(): Promise<void> {
    const [language, systemLanguage] = await Promise.all([
        getLanguage(),
        detectSystemLanguage()
    ])

    setStoredLanguage(language)
    setSystemLanguage(systemLanguage)
    setResolvedLanguage(
        resolveLanguage(language, systemLanguage)
    )

    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <AddTorrentPage />
        </StrictMode>
    )
}

bootstrap()
