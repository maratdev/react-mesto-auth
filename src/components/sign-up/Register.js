import {Link} from 'react-router-dom';
export default function Register ()  {
    return (
        <main>
            <section className="login">
                <h2 className="login__title">Регистрация</h2>
                <form className="login__form">
                    <input className="login__input" placeholder="Email" type="text" name="username" required/>
                    <input className="login__input" placeholder="Пароль" required name="password" type="password" />
                    <div className="login__form-wrap">
                        <button type="button" className="login__btn">Зарегистрироваться</button>
                        <p className="login__subtitle">Уже зарегистрированы? <Link to="/signin" className="login__link">Войти</Link></p>
                    </div>
                </form>

            </section>
        </main>
    )
}