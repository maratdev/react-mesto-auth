import React, { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useFormWithValidation from "../hooks/useFormWithValidation";

export default function EditProfilePopup(props, isOpen) {
  const { values, handleChange, errors, isValid, resetForm, setValues } =
    useFormWithValidation({
      user_name: "",
      user_job: "",
    });

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser.name && currentUser.about) {
      setValues({
        user_name: currentUser.name,
        user_job: currentUser.about,
      });
    }
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, currentUser]);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      props.onUpdateUser({
        name: values.user_name,
        about: values.user_job,
      });
    }
  }

  return (
    <PopupWithForm
      name="edit-user"
      title="Редактировать профиль"
      submitTitle={props.isLoading ? "Сохраняем..." : "Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        id="name-input"
        className={`form__input form__input_string_name ${
          !errors.user_name ? "" : "form__input-error"
        }`}
        type="text"
        value={values.user_name || ""}
        onChange={handleChange}
        name="user_name"
        placeholder="Ваше имя"
        maxLength={40}
        minLength={2}
        required
      />
      <span className="form__span-error name-input-error">
        {" "}
        {errors.user_name}{" "}
      </span>
      <input
        id="user-job-input"
        className={`form__input form__input_string_job ${
          !errors.user_job ? "" : "form__input-error"
        }`}
        type="text"
        name="user_job"
        value={values.user_job || ""}
        onChange={handleChange}
        placeholder="О себе"
        maxLength={200}
        minLength={2}
        required
      />
      <span className="form__span-error user-job-input-error">
        {errors.user_job}
      </span>
    </PopupWithForm>
  );
}
