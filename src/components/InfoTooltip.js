import img from '../images/tooltip.svg';

export default function InfoTooltip({ onClose, isOpen } ) {
    return (
        <div className={`popup popup_tooltip ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button
                    onClick={onClose}
                    type="button"
                    className="popup__close"
                    aria-label="Закрыть Popup"
                />
                <img className="popup__img" src={img} alt="иконка успех регистрации"/>
                <h3 className="popup__title">Вы успешно зарегистрировались!</h3>

            </div>
        </div>
    )
}