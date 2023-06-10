import Popup from "./Popup";
export default function PopupWithForm({
  isOpen,
  onClose,
  name,
  title,
  onSubmit,
  submitTitle,
  children,
  elemClass,
  isValid,
}) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose} >
      <h3 className="popup__title">{title}</h3>
      <form
          className={`form form_${name}`}
          name={`popup__form-${name}`}
          onSubmit={onSubmit}
      >
        {children}
        <button
            disabled={!isValid}
            className={`form__input-btn ${
                !isValid ? "form__input-btn_disabled" : ""
            } ${elemClass ? "form__del-btn" : ""}`}
            type="submit"
        >
          {submitTitle}
        </button>
      </form>
    </Popup>
  );
}
