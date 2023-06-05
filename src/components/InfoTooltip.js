import successImg from '../images/tooltip.svg';
import errorImg from '../images/tooltip_error.svg';
export default function InfoTooltip({ onClose, isOpen, tooltip} ) {
    return (
        <div className={`popup popup_tooltip ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button
                    onClick={onClose}
                    type="button"
                    className="popup__close"
                    aria-label="Закрыть Popup"
                />
                <img
                    className="popup__img"
                    src={tooltip.image ? successImg : errorImg}
                    alt={tooltip.message}
                />
                <h3 className="popup__title">{tooltip.message}</h3>

            </div>
        </div>
    )
}