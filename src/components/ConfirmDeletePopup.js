import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup(props) {
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onConfirm();
  }

  return (
    <PopupWithForm
      submitTitle={props.isLoading ? "Сохраняем..." : "Да"}
      name="del-card"
      title="Вы уверены?"
      elemClass //true
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid //true
    ></PopupWithForm>
  );
}

export default ConfirmDeletePopup;
