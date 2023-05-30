import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    return (
        <nav className="menu">
            <NavLink to="/signup" className="menu__link">Регистрация</NavLink>
            {/*<NavLink to="/signin" className="menu__link">Регистрация</NavLink>*/}
        </nav>
    );
}