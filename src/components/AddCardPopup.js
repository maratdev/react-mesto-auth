import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "../hooks/useFormWithValidation";

export default function AddCardPopup(props, isOpen) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation({
      card_name: "",
      card_src: "",
    });

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      props.handleAddPlaceClick({
        name: values.card_name,
        link: values.card_src,
      });
    }
    evt.target.reset();
  }

  useEffect(() => {
    if (!props.isOpen) {
      resetForm();
    }
  }, [props.onClose]);

  //console.log(values.card_name)
  return (
    <PopupWithForm
      submitTitle={props.isLoading ? "Добавляем..." : "Добавить"}
      name="add-card"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        id="image-input"
        className={`form__input form__input_string_place ${
          !errors.card_name ? "" : "form__input-error"
        }`}
        type="text"
        value={values.card_name || ""}
        onChange={handleChange}
        name="card_name"
        placeholder="Название"
        maxLength={30}
        minLength={2}
        required
      />
      <span className="form__span-error image-input-error">
        {" "}
        {errors.card_name}
      </span>
      <input
        id="src-input"
        className={`form__input form__input_string_src ${
          !errors.card_src ? "" : "form__input-error"
        }`}
        value={values.card_src || ""}
        type="url"
        onChange={handleChange}
        name="card_src"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="form__span-error src-input-error">
        {errors.card_src}
      </span>
    </PopupWithForm>
  );
}
