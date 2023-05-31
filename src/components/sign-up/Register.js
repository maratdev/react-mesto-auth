import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import * as auth from '../../utils/auth';
export default function Register ()  {

    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        console.log()
        e.preventDefault();
        if (formValue.password && formValue.email){
            const { password, email } = formValue;
            auth.register(password, email).then((res) => {
                   // navigate('/signin', {replace: true});
                //setInfoTooltip(true)
                }
            );
        }
    }

    return (
        <main>
            <section className="login">
                <h2 className="login__title">Регистрация</h2>
                <form onSubmit={handleSubmit} className="login__form">
                    <input className="login__input" placeholder="Email" type="text" name="email" value={formValue.email} onChange={handleChange} required/>
                    <input className="login__input" placeholder="Пароль" type="password" name="password" value={formValue.password}  onChange={handleChange}  required/>
                    <div className="login__form-wrap">
                        <button type="submit" onSubmit={handleSubmit} className="login__btn">Зарегистрироваться</button>
                        <p className="login__subtitle">Уже зарегистрированы? <Link to="/signin" className="login__link">Войти</Link></p>
                    </div>
                </form>

            </section>
        </main>
    )
}