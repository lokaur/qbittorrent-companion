import { AiOutlineClose } from "react-icons/ai"
import './styles/SelectedCounter.css'

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
                    <span>{count} selected</span>
                    <button
                        type="button"
                        className="icon-button"
                        title="Clear selected"
                        onClick={onClear}
                    >
                        <AiOutlineClose size={12} />
                    </button>
                </div>)}
        </div>
    )
}
