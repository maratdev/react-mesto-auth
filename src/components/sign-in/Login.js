import React, { useState } from "react";

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
    <main>
      <section className="login">
        <h2 className="login__title">Вход</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            className="login__input"
            placeholder="Email"
            type="email"
            name="email"
            value={formValue.email || ""}
            onChange={handleChange}
            required
          />
          <input
            className="login__input"
            placeholder="Пароль"
            type="password"
            name="password"
            value={formValue.password || ""}
            onChange={handleChange}
            required
            autoComplete="on"
          />
          <div className="login__form-wrap">
            <button
              type="submit"
              className="login__btn"
              onSubmit={handleSubmit}
            >
              Войти
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
