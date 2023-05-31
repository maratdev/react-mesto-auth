import img from '../images/tooltip.svg';
import img_error from '../images/tooltip_error.svg';

export default function InfoTooltip({ onClose, isOpen, isInfoError} ) {
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
                    src={!isInfoError ? img : img_error}
                    alt={!isInfoError ? `иконка успех регистрации` : `иконка ошибки регистрации`}
                />
                <h3 className="popup__title">{!isInfoError ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h3>

            </div>
        </div>
    )
}