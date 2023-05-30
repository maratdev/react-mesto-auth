
export default function PopupWithForm( {isOpen, onClose, name, title, onSubmit, submitTitle, children, elemClass, isValid} ) {
   //console.log(isValid)
    return (
        <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button
                    onClick={onClose}
                    type="button"
                    className="popup__close"
                    aria-label="Закрыть Popup"
                />
                <h3 className="popup__title">{title}</h3>
                <form
                    className={`form form_${name}`}
                    name={`popup__form-${name}`}
                    onSubmit={onSubmit}
                >
                    {children}
                    <button
                        disabled={!isValid}
                        className={`form__input-btn ${!isValid ? 'form__input-btn_disabled' : ''} ${elemClass ? 'form__del-btn' : ''}`}
                        type="submit">
                        {submitTitle}
                    </button>
                </form>
            </div>
        </div>
    )
}