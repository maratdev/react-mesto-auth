import logo from '../images/logo.svg';
import burger_opn from '../images/burger_menu.svg';
import burger_close from '../images/burger_close.svg';
import NavBar from "./NavBar";
import {useState} from "react";

export default function Header({loggedIn, userData, signOut} ) {
    const [menuVisible, setMenuVisible] = useState(true);
    //console.log(loggedIn)

    return (
        <header className={`header page__header ${!loggedIn ? 'header__mobile' : ''} `}>
            <div className="header__wrap">
            <img
                className="header__logo"
                src={logo}
                alt="логотип Mesto"
            />
                {loggedIn &&
                    <img
                        onClick={()=>setMenuVisible(!menuVisible)}
                        className="header__btn"
                        src={menuVisible ? burger_opn : burger_close}
                        alt="меню"
                    />

                }

            </div>
            {
               <NavBar
                menuVisible={menuVisible}
                signOut={signOut}
                loggedIn={loggedIn}
                userData={userData}
               />
            }

        </header>
    )
}