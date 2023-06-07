import React, { useState } from "react";
import AuthForm from "../AuthForm";

export default function Register({ handleRegisterUser }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (formValue.password && formValue.email) {
      handleRegisterUser({
        password: formValue.password,
        email: formValue.email,
      });
    }
  }

  return (
    <AuthForm
      title="Регистрация"
      titleBtn="Зарегистрироваться"
      titleFormFooter="Уже зарегистрированы?"
      handleSubmit={handleSubmit}
      formValue={formValue}
      handleChange={handleChange}
      loginLink={true}
    />
  );
}
