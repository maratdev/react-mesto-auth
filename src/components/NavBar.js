import React from 'react';
import {NavLink, Route, Routes } from 'react-router-dom';

export default function NavBar({loggedIn, userData, signOut}) {

    return (
        <nav className="menu">
            {userData.email && (
                <>
                <p className="menu__title">{userData.email}</p>
                <button className="menu__link menu__link_out" onClick={signOut}>Выйти</button>
                </>
            )
            }

            <Routes>
                !loggedIn && (
                <Route
                    path="signin"
                    element={<NavLink to="/signup" className="menu__link">Регистрация</NavLink>}
                />
                <Route
                    path="signup"
                    element={<NavLink to="/signin" className="menu__link">Войти</NavLink>}
                />)
            </Routes>
        </nav>

    );
}