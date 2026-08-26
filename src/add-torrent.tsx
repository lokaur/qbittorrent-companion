import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AddTorrentPage } from "./components/pages/AddTorrentPage";
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AddTorrentPage />
    </StrictMode>
)
