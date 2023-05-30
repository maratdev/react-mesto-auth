import React from 'react';
import {NavLink, Route, Routes } from 'react-router-dom';

export default function NavBar( props) {

    return (
        <nav className="menu">
            <Routes>
                <Route
                    path="signin"
                    element={<NavLink to="/signup" className="menu__link">Регистрация</NavLink>}
                />
                <Route
                    path="signup"
                    element={<NavLink to="/signin" className="menu__link">Войти</NavLink>}
                />
            </Routes>
        </nav>
    );
}