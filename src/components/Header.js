import logo from '../images/logo.svg';
import NavBar from "./NavBar";

export default function Header({loggedIn, userData, signOut} ) {
   // console.log(userData)
    return (
        <header className="header page__header">
            <img
                className="header__logo"
                src={logo}
                alt="логотип Mesto"
            />
            {
               <NavBar
                signOut={signOut}
                loggedIn={loggedIn}
                userData={userData}
               />
            }

        </header>
    )
}