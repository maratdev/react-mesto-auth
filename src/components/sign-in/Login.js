import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

export default function Login ()  {
    return (
        <main>
        <section className="login">
            <h2 className="login__title">Вход</h2>
            <form className="login__form">
                <input className="login__input" placeholder="Email" type="text" name="username" required/>
                <input className="login__input" placeholder="Пароль" required name="password" type="password" />
                <div className="login__form-wrap">
                 <button type="button" className="login__btn">Войти</button>
                </div>
            </form>
        </section>
        </main>
    )
}