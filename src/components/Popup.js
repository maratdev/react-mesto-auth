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

    document.addEventListener("keydown", closeByEscape);
    // обязательно удаляем обработчик в `clean-up` функции
    return () => document.removeEventListener("keydown", closeByEscape);
    // обязательно следим за `isOpen`, чтобы срабатывало только при открытии, а не всегда
  }, [isOpen, onClose]);

  // создаем обработчик оверлея
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // внутри верстка обертки любого попапа с классом `popup` и добавлением `popup_opened`.
  return (
    <div
      className={`popup popup_${name} ${isOpen ? "popup_opened" : ""} `}
      onClick={handleOverlay}
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
