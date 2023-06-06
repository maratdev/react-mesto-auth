import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";

export default function NavBar({ loggedIn, userData, signOut, menuVisible }) {
  return (
    <nav
      className={`menu ${!loggedIn ? "menu__signin" : ""} ${
        !menuVisible ? "menu__active" : ""
      } `}
    >
      <ul className="menu__items list">
        {userData.email && (
          <>
            <li>
              <p className="menu__title">{userData.email}</p>
            </li>
            <li>
              <button className="menu__link menu__link_out" onClick={signOut}>
                Выйти
              </button>
            </li>
          </>
        )}

        <Routes>
          !loggedIn && (
          <Route
            path="signin"
            element={
              <li>
                <NavLink to="/signup" className="menu__link">
                  Регистрация
                </NavLink>
              </li>
            }
          />
          <Route
            path="signup"
            element={
              <li>
                <NavLink to="/signin" className="menu__link">
                  Войти
                </NavLink>
              </li>
            }
          />
          )
        </Routes>
      </ul>
    </nav>
  );
}
