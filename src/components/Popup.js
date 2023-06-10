import { useEffect } from "react";
// создаем отдельный компонент `Popup` для обертки любых попапов
const Popup = ({ isOpen, name, onClose, children, onImgClass }) => {
  // внутри указываем `useEffect` для обработчика `Escape`
  useEffect(() => {
    // ограничиваем навешивание обработчика: если не открыт, то не нужно навешивать
    if (!isOpen) return;
    // объявляем внутри `useEffect` функцию, чтобы она не теряла ссылку при перерисовке компонента
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    // создаем обработчик оверлея
    const handleOverlay = (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        onClose();
      }
    };

    document.addEventListener("keydown", closeByEscape);
    document.addEventListener("mousedown", handleOverlay);
    // обязательно удаляем обработчик в `clean-up` функции
    return () => {
      document.removeEventListener("keydown", closeByEscape);
      document.removeEventListener("mousedown", handleOverlay);
    };
    // обязательно следим за `isOpen`, чтобы срабатывало только при открытии, а не всегда
  }, [isOpen, onClose]);



  // внутри верстка обертки любого попапа с классом `popup` и добавлением `popup_opened`.
  return (
    <div
      className={`popup popup_${name} ${isOpen ? "popup_opened" : ""} `}
    >
      <div
        className={`${
          onImgClass ? "popup__img-container" : "popup__container"
        }`}
      >
        <button
          onClick={onClose}
          type="button"
          className="popup__close"
          aria-label="Закрыть Popup"
        />
        {children}
      </div>
    </div>
  );
};

export default Popup;
