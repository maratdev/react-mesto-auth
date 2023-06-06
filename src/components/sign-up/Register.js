import React, {useState} from 'react';
import {Link} from 'react-router-dom';

export default function Register ({handleRegisterUser })  {

    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
    })


    function handleChange (evt){
        const { name, value } = evt.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    function handleSubmit(evt){
        evt.preventDefault();
        if(formValue.password && formValue.email){
            handleRegisterUser({
                password: formValue.password,
                email: formValue.email
            })
        }
    }



    return (
        <main>
            <section className="login">
                <h2 className="login__title">Регистрация</h2>
                <form onSubmit={handleSubmit} className="login__form">
                    <input className="login__input" placeholder="Email" type="email" name="email" value={formValue.email} onChange={handleChange } required  />
                    <input className="login__input" placeholder="Пароль" type="password" name="password" value={formValue.password} onChange={handleChange } minLength={4} required />
                    <div className="login__form-wrap">
                        <button type="submit" onSubmit={handleSubmit} className="login__btn">Зарегистрироваться</button>
                        <p className="login__subtitle">Уже зарегистрированы? <Link to="/signin" className="login__link">Войти</Link></p>
                    </div>
                </form>

            </section>
        </main>
    )
}