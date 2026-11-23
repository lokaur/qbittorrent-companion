import { AiOutlineClose } from "react-icons/ai"
import './styles/SelectedCounter.css'
import { t } from "../../i18n/i18n"

interface SelectedCounterProps {
    count: number
    onClear: () => void
}
export function SelectedCounter({
    count,
    onClear
}: SelectedCounterProps) {
    return (
        <div className="selected-count">
            {count > 0 && (
                <div>
                    <span>{t('selected_count', { count })}</span>
                    <button
                        type="button"
                        className="icon-button"
                        title={t('clear_selected')}
                        onClick={onClear}
                    >
                        <AiOutlineClose size={12} />
                    </button>
                </div>)}
        </div>
    )
}
