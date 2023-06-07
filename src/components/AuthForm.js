import React from "react";
import { Link } from "react-router-dom";

function AuthForm({
  handleSubmit,
  formValue,
  handleChange,
  title,
  titleFormFooter,
  loginLink,
  titleBtn,
}) {
  return (
    <main>
      <section className="login">
        <h2 className="login__title">{title}</h2>
        <form onSubmit={handleSubmit} className="login__form">
          <input
            className="login__input"
            placeholder="Email"
            type="email"
            name="email"
            value={formValue.email}
            onChange={handleChange}
            required
          />
          <input
            className="login__input"
            placeholder="Пароль"
            type="password"
            name="password"
            value={formValue.password}
            onChange={handleChange}
            minLength={4}
            required
            autoComplete="on"
          />
          <div className="login__form-wrap">
            <button
              type="submit"
              onSubmit={handleSubmit}
              className="login__btn"
            >
              {titleBtn}
            </button>

            {loginLink && (
              <p className="login__subtitle">
                {titleFormFooter}{" "}
                <Link to="/signin" className="login__link">
                  Войти
                </Link>
              </p>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}

export default AuthForm;
