import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavBar({ loggedIn, userData, signOut, menuVisible }) {
  const location = useLocation();
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

        {
            !loggedIn && (
              <>
                {location.pathname === "/signin" && (
                    <li>
                    <Link to="/signup" className="menu__link">
                      Регистрация
                    </Link>
                    </li>
                )}
                  <li>
                    {location.pathname === "/signup" && (
                        <Link to="/signin" className="menu__link">
                          Войти
                        </Link>
                    )}
                  </li>
              </>

          )
        }


      </ul>
    </nav>
  );
}
