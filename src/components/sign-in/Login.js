import React, { useState } from "react";
import AuthForm from "../AuthForm";

export default function Login({ handleAuthorizeUser }) {
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
      handleAuthorizeUser({
        password: formValue.password,
        email: formValue.email,
      });
    }
  }

  return (
    <AuthForm
      title="Вход"
      titleBtn="Войти"
      handleSubmit={handleSubmit}
      formValue={formValue}
      handleChange={handleChange}
      loginLink={false}
    />
  );
}
